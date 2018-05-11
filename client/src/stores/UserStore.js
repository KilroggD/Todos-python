import { observable, computed, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'
import StorageService from '../services/StorageService'

class UserStore {
    @observable isLoading = true
    @observable isFailure = false
    @observable users = []

    @computed get total() {
        return this.users.length
    }

    @action async getUsers(params) {
        try {
            const data = await ApiService.search_users(params)          
            runInAction(() => {
                this.isLoading = false
                this.users = data.users
                if (Object.keys(params).length && data.users.length) {
                    //save successful request
                    StorageService.setSearchData(params)
                }
            })
        } catch (e) {
            runInAction(() => {
                this.isLoading = false
                this.isFailure = true
                this.users = []
            })
        }
    }

}

export default new UserStore()
export { UserStore }

import { observable, computed, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'

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

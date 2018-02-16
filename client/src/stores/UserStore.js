import { observable, computed, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'

class UserStore {
    @observable isLoading = true
    @observable isFailure = false
    @obervable users = []

    @computed get total() {
        return users.length
    }

    @action async getUsers(params) {
        try {
            runInAction(() => {
                const users = await ApiService.users(params)
                this.isLoading = false
                this.users = users
            })
        } catch (e) {
            runInAction(() => {
                this.isLoading = false
                this.isFailure = true
            })
        }
    }

}

export default new UserStore()
export { UserStore }

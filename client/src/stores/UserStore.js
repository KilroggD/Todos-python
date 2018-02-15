import { observable, computed, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'

class UserStore {
    @observable isLoading = true
    @observable isFailure = false
    @obervable users = []

    @computed get total {
        return users.length
    }

    @action async getUsers(params) {
        this.isLoading = true
        this.isFailure = false
        try {
            const users = await ApiService.users(params)
        }
    }

}

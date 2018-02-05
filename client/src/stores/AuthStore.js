import { observable, computed, reaction } from 'mobx'
import ApiService from '../services/ApiService'
import StorageService from '../services/StorageService'

class AuthStore {
    @observable isAuthenticated = false
    @observable isLoading = true
    @observable isFailure = false
    @observable currentUser = null
    @observable profileErrors = null

    @action async login(params) {
        try {
            const res = await ApiService.login(params)
            StorageService.setToken(res.key)
            runInAction(() => {
                this.isAuthenticated = true
                this.isFailure = false
            })
        } catch (e) {
            runInAction(() => {
                this.isAuthenticated = false
                this.isFailure = true
            })
        }
    }

    @action async logout() {
        await ApiService.logout(StorageService.getToken())
        StorageService.removeToken()
        runInAction(() => {
            this.isAuthenticated = false
            this.isFailure = false
            this.currentUser = null
            this.isLoading = false
        })
    }


    @action async fetchProfile() {
        const res = await ApiService.current_user(StorageService.getToken())
        this.isLoading = true
        runInAction(() => {
            this.isLoading = false
            this.currentUser = res
        })
    }

}
import { observable, action, runInAction } from 'mobx'
import ApiService from '../services/ApiService'
import history from '../services/history'

class RegisterStore {
    @observable success = false
    @observable failure = false
    @observable errors = {}

    @action async register(params) {
        const reg = await ApiService.register(params)
        console.log(reg)
        if(reg.status === 201) {
            runInAction(() => {
                this.success = true
                this.failure = false
                this.errors = {}
            })
        } else {
            runInAction(() => {
                this.success = false
                this.failure = true
                this.errors = reg.body
            })
        }
       
    }
}

export default new RegisterStore
export { RegisterStore }


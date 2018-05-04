import { observable, action, runInAction } from 'mobx'
import StorageService from '../services/StorageService'

class SearchStore {

    @observable searchData = {}

    @action loadForm(data) {
        this.searchData = {
            ...this.searchData,
            ...data
        }
    }

    @action loadStoredData() {
        //load form data from local storage
        const data = StorageService.getSearchData() || {}
        //dispatch an action        
        this.loadForm(data)
    }

    @action clearForm() {
        StorageService.removeSearchData()
        this.searchData = {}
    }

}

export default new SearchStore()

export { SearchStore }

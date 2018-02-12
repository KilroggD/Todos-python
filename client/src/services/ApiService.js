import api from '../api';
import StorageService from './StorageService'

/**
 * Service to abstract api calls to one file - to be used in middleware
 */
class ApiSerice {


    constructor() {
        this.api_url = 'http://127.0.0.1:8000';
    }

    /**
     * Service function to avoid repetition of fetch everywhere
     * @param {string} url - url to fetch
     * @param {string} method - method get or post
     * @param {string|boolean} token  - authentication token
     * @param {object|null} params - params payload
     */
    async apiCall(url, method = 'GET', token = false, params = null) {
        let payload = {
            method,
            mode: 'cors',
            headers: this.buildHeaders(token),
        }
        if (params) {
            payload.body = JSON.stringify(params);
        }
        const res = await fetch(`${this.api_url}${url}`, payload);
        const status = res.status;
        const body = await res.json();
        return { status, body };
    }

    /**
     * Build  http headers object
     * @param {string|boolean} token 
     */
    buildHeaders(token = false) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (token) {
            headers.append('Authorization', `Token ${token}`);
        }

        return headers;
    }

    /**
     * Throw common error on not successful status
     * @param {object} response 
     * @param {bool} auth - check for unauth error or not
     */
    handleCommonError(response, auth = false) {
        if(response.status === 401 && auth) {
            StorageService.removeToken()
            window.location(api.login)
        }
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(response.status)
        }
        return;
    }   

    async register(params) { //registration
        const reg = await this.apiCall(api.sign_up, 'POST', false, params);
        return reg;
    }

    async login(params) { //login
        const res = await this.apiCall(api.login, 'POST', false, params);
        this.handleCommonError(res);
        return res.body;
    }

    async logout(token) { //login
        const res = await this.apiCall(api.logout, 'POST', false, null, token);
        return res.status;
    }

    async verify_token(token = false) { //verify token on load
        const res = await this.apiCall(api.verify_token, 'POST', false, { token });
        this.handleCommonError(res);
        return res.status;
    }

    async current_user(token = false) { //load current user profile
        if (!token) {
            throw new Error('Error loading profile. Missing token!')
        }
        const res = await this.apiCall(api.current_user, 'GET', token);
        this.handleCommonError(res);
        return res.body;
    }

    async get_user(id = null) { //get user by id
        const res = await this.apiCall(`${api.user}/${id}`);
        this.handleCommonError(res);
        return res.body;
    }

    async edit_user(id = 0, token = false, params) { //edit user by id/params
        if (!token) {
            throw new Error('Error editing profile. Missing token!')
        }
        const res = await this.apiCall(
            `${api.user}/${id}/`,
            'PUT',
            token,
            params
        );
        return res;
    }

    async users(token) { //get users list
        const res = await this.apiCall(api.users, 'GET', token);
        this.handleCommonError(res);
        return res.body;
    }

    async get_todos(token) { //get topics list
        const res = await this.apiCall(api.todos, 'GET', token);
        this.handleCommonError(res);
        return res.body;
    }

    async add_todo(token, params) {
        const res = await this.apiCall(`${api.todos}`, 'POST', token, params);
        this.handleCommonError(res);
        return res.body;
    }

    async get_todo(id, token) { //edit topic
        const res = await this.apiCall(
            `${api.todo}/${id}/`,
            'GET',
            token,
        );
        this.handleCommonError(res);
        return res.body;
    }

    async edit_todo(id, token, params) { //edit topic
        const res = await this.apiCall(
            `${api.todo}/${id}/`,
            'PUT',
            token,
            params
        );
        this.handleCommonError(res);
        return res.body;
    }

}

export default new ApiSerice()

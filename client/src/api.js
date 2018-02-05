
const AUTH = '/rest-auth'
const API = '/api'

const api = {
    login: AUTH + '/login/',
    logout: AUTH + '/logout/',  
    verify_token: AUTH + '/token-verify/',
    sign_up: API + '/register/',
    users: API + '/users/',
    user: API + '/user',
    current_user: API + '/current_user/',
    todos: API + '/todos/',
    todo: API + '/todo',

}

export default api

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import history from '../services/history'
import StorageService from '../services/StorageService'
import LoginForm from '../forms/LoginForm'
import routes from '../routes'

@inject('authStore') @observer
class LoginContainer extends React.Component {


    handleLogin = async (params) => {
        await this.props.authStore.login(params)
    }

    async componentWillReact() {
        if(this.props.authStore.isAuthenticated) {
            await this.props.authStore.fetchProfile()
            history.push('/')
        }
    }

    render() {
        const authStore = this.props.authStore
        if (StorageService.getToken() || authStore.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div className='login'>
                <LoginForm handler={this.handleLogin} />
                {
                    authStore.isFailure &&
                    <p className="ut__badge ut__badge--error">Login failed</p>
                }
                <Link to={routes.sign_up}>Not registered? Sign up!</Link>
            </div>
        )
    }

}

export default LoginContainer

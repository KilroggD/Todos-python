import React from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { StorageService } from '../services/StorageService'
import LoginForm from '../forms/LoginForm'

@inject('authStore') @observer
class LoginContainer extends React.Component {


    handleLogin = async (params) => {
        await this.props.authStore.login()
    }

    render() {
        const authStore = this.props.authStore
        if (StorageService.getToken() || authStore.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div className='login'>
                <LoginForm handler={this.handleLogin}>
                {
                    authStore.isFailure &&
                    <p className="ut__badge ut__badge--error">Login failed</p>
                }
            </div>
        )
    }

}
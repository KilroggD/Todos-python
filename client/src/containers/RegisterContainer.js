import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import history from '../services/history'
import routes from '../routes'
import StorageService from '../services/StorageService'
import RegisterForm from '../forms/RegistrationForm'
import RegisterStore from '../stores/RegisterStore'
import ErrorValidation from '../components/ErrorValidation'


@inject('registerStore') @observer
class RegisterContainer extends React.Component {

    handleRegister = async (params) => {
        await this.props.registerStore.register(params)
    }

    displayErrors() {
        return <ErrorValidation errors={this.props.registerStore.errors} />
    }

    render() {
        const registerStore = this.props.registerStore
        if (StorageService.getToken()) {
            return <Redirect to='/' />
        }
        return (
            <div className='register'>
                <RegisterForm handler={this.handleRegister} />
                {
                    registerStore.failure && this.displayErrors()
                }
                {
                    registerStore.success &&
                    <div className='register__success'>
                        <p>Registration Successful!</p>
                        <p><Link className="ut__button" to={routes.login}>Sign in</Link> now!</p>
                    </div>
                }
            </div>
        )
    }

}

export default RegisterContainer

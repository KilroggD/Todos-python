import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import routes from '../routes'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import history from '../services/history'


/**
 * Home page extra component
 */
@inject('authStore') @observer
class Home extends Component {

    render() {

        const authStore = this.props.authStore
        if (authStore.currentUser) {
            // redirect to users list
            return <Redirect to={routes.users} />
        }

        return <div className="ut__home">
            <h2>Welcome to Test app</h2>
            <section className="ut__btn-group">
                <Link className="ut__button" to={routes.login}>Sign in</Link>
                <Link className="ut__button" to={routes.sign_up}>Sign up!</Link>
            </section>
        </div>
    }

}

export default Home

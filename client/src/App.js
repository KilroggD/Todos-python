import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import routes from './routes'
import Header from './components/Header'
import logo from './logo.svg'
import './App.css'

@inject('authStore') @observer
class App extends Component {

    async componentDidMount() {
        await this.props.authStore.fetchProfile()
    }

    logoutHandler = async () => {
        await this.props.authStore.logout()
    }

    render() {
        console.log('render app')
        const authStore = this.props.authStore
        if (authStore.isLoading) {
            // loading state
            return <p>Loading...</p>
        }
        return (
            <main>
                {authStore.currentUser && <Header current_user={authStore.currentUser} logout={this.logoutHandler} />}
                {this.props.children}
            </main>
        );
    }
}

export default App;

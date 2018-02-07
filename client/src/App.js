import React, { Component } from 'react'
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
        const authStore = this.props.authStore
        if (authStore.isLoading) {
            // loading state
            return <p>Loading...</p>
        }
        if (!authStore.isAuthenticated || !authStore.currentUser) {
            // go to login if not auth
            return null
        }
        return (
            <div className="App">
                {authStore.currentUser && <Header current_user={authStore.currentUser} logout={this.logoutHandler} />}
                {this.props.children}
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { Router, Switch, Route } from 'react-router'
import history from './services/history'
import authStore from './stores/AuthStore'
import App from './App'
import Home from './containers/Home'
import LoginContainer from './containers/LoginContainer'
import UserListContainer from './containers/UserListContainer'

const stores = { authStore }

ReactDOM.render(
    <Provider { ...stores }>
        <App>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/users" component={UserListContainer} />
                </Switch>
            </Router>
        </App>
    </Provider>,
    document.getElementById('root')
);

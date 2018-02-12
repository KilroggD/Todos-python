import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { Router, Switch, Route, IndexRoute, browserHistory } from 'react-router'
import authStore from './stores/AuthStore'
import App from './App'
import Home from './containers/Home'
import LoginContainer from './containers/LoginContainer'

const stores = { authStore }

ReactDOM.render(
    <Provider { ...stores }>
        <App>
            <Router history={browserHistory}>
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/login" component={LoginContainer} />
                </Switch>
            </Router>
        </App>
    </Provider>,
    document.getElementById('app')
);

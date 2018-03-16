import React from 'react'
import Form from './Form'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        return this.props.handler({
            email: this.email.value,
            password: this.password.value,
        })
    }

    render() {
        return <div className="login-container">
            <Form onSubmit={this.handleSubmit} title="Sign In" button="Sign In">
                <input type="email" required placeholder="Email" ref={input => this.email = input} />
                <input type="password" required placeholder="Password" ref={input => this.password = input} />
            </Form>
        </div>
    }

}

export default LoginForm

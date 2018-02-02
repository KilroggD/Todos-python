import React from 'react'

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
            <h3>Use email for login and lowercase last name as password</h3>
            <form onSubmit={this.handleSubmit} >
                <input type="email" required placeholder="Email" ref={input => this.email = input} />
                <input type="password" required placeholder="Password" ref={input => this.password = input} />
                <input type="submit" value="Login" />
            </form>
        </div>
    }

}

export default LoginForm

import React from 'react'
import Form from './Form'

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props)
        this.fields = {}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let params = {};
        for (let field in this.fields) {
            params[field] = this.fields[field]['value']
        }
        return this.props.handler(params)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} title="Create Your Credentials" button="sign up">
                <input type="email" required placeholder="Email" ref={(input) => this.fields.email = input} />
                <input type="password" required placeholder="Password"
                    ref={(input) => this.fields.password = input} />
                <input type="password" required placeholder="Password Confirmation"
                    ref={(input) => this.fields.confirm_password = input} />
            </Form>
        );
    }

}

export default RegistrationForm;

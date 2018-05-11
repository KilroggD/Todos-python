import React from 'react';

class UserForm extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.submitHandler(this.props.data);
    }

    handleChange(event) {
        event.preventDefault()
        this.props.changeHandler({[event.target.name]: event.target.value})
    }

    handleClear(event) {
        event.preventDefault()
        this.props.clearHandler()
    }

    render() {
        return (
            <form className="user__form" onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={this.props.data.first_name || ''}
                        onChange={this.handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={this.props.data.last_name || ''}
                        onChange={this.handleChange} />
                </label>
                <label>
                Department:
                    <select name="department" value={this.props.data.department || ''} onChange={this.handleChange}>
                        <option value=''>Select department</option>
                        <option value="Technology">Technology</option>
                        <option value="Support">Support</option>
                        <option value="Legal">Legal</option>
                    </select>
                </label>
                <label>
                    Country
                    <select name="country" value={this.props.data.country || ''} onChange={this.handleChange}>
                        <option value=''>Select country</option>
                        <option value="Ireland">Ireland</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                    </select>
                </label>
                <label>
                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                    <input type="button" value="Clear" onClick={this.handleClear} />
                </label>
            </form>
        );
    }

}
export default UserForm;

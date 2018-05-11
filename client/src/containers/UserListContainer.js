import React from 'react'
import { observer, inject } from 'mobx-react'
import UserForm from '../forms/UserForm'
import UserList from '../components/UserList'

@inject('userStore', 'searchStore') @observer
class UserListContainer extends React.Component {

    async componentDidMount() {
        this.props.searchStore.loadStoredData()
        await this.props.userStore.getUsers({})
    }

    getUsers = async(params) => {
        Object.keys(params).forEach(key => {
            if(!params[key].length) {
                delete params[key]
            }
        });
        await this.props.userStore.getUsers(params)
    }

    render() {
        const userStore = this.props.userStore
        const searchStore = this.props.searchStore
        //add loading and failure state
        if (this.props.isLoading) {
            return <span>Loading...</span>
        }

        if (this.props.isFailure) {
            return <span>Error loading users!</span>
        }

        return <div className="user">
            <UserForm data={searchStore.searchData}
                submitHandler={this.getUsers}
                changeHandler={searchStore.loadForm.bind(searchStore)}
                clearHandler={searchStore.clearForm.bind(searchStore)} />
            {userStore.users && <UserList users={userStore.users} />}
        </div>;
    }
}

export default UserListContainer

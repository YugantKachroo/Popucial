import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { remove } from './apiUser';
import { signout } from '../auth';
import { Redirect } from 'react-router-dom';
class DeleteUser extends Component {
  state = {
    redirect: false,
  };
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        signout(() => console.log('User is deleted'));
        this.setState({ redirect: true });
      }
    });
  };
  deleteConfirm = () => {
    let ans = window.confirm(
      'Are you sure that you want to delete your account?'
    );
    if (ans) {
      this.deleteAccount();
    }
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    }
    return (
      <button
        onClick={this.deleteConfirm}
        className='btn btn-raised btn-danger'
      >
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser;

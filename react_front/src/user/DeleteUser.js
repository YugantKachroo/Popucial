import React, { Component } from 'react';
class DeleteUser extends Component {
  deleteAccount = () => {
    console.log('account deleted');
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

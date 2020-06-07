import React, { Component } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false,
    };
  }

  handleChange = (ename) => (event) => {
    this.setState({ [ename]: event.target.value });
    this.setState({ error: '' });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };

    signup(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          name: '',
          email: '',
          password: '',
          error: '',
          open: true,
        });
      }
    });
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className='container'>
        <h4 className='mt-5 mb-5'>Signup</h4>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        <div
          className='alert alert-info'
          style={{ display: open ? '' : 'none' }}
        >
          New account is successfully created. Please{' '}
          <Link to='/sign'>Sign In</Link>
        </div>
        <form>
          <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input
              onChange={this.handleChange('name')}
              type='text'
              className='form-control'
              value={name}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Email</label>
            <input
              onChange={this.handleChange('email')}
              type='email'
              className='form-control'
              value={email}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Password</label>
            <input
              onChange={this.handleChange('password')}
              type='password'
              className='form-control'
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className='btn btn-raised btn-primary'
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      redirect: false,
      loading: false,
    };
  }

  handleChange = (ename) => (event) => {
    this.setState({ [ename]: event.target.value });
    this.setState({ error: '' });
  };

  authenticate(jwt, next) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(jwt));
      next();
    }
  }

  clickSubmit = (event) => {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    this.signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.authenticate(data, () => {
          this.setState({ redirect: true });
        });
      }
    });
  };

  signin = (user) => {
    return fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { email, password, error, redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container'>
        <h4 className='mt-5 mb-5'>Sign In</h4>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <form>
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
        )}
      </div>
    );
  }
}

export default Signin;

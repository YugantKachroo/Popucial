import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update } from './apiUser';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirecttoprofile: false,
      error: '',
    };
  }
  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirecttoprofile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: '',
        });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  isValid = () => {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: 'Name is required' });
      return false;
    }
    // eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: 'A valid email is required' });
      return false;
    }
    if (password.length >= 1 && password.length <= 6) {
      this.setState({ error: 'Password is too short' });
      return false;
    }
    return true;
  };

  handleChange = (ename) => (event) => {
    this.setState({ [ename]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, email, password } = this.state;
      const user = {
        name,
        email,
        password: password || undefined,
      };
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, user).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            redirecttoprofile: true,
          });
        }
      });
    }
  };

  signupForm = (name, email, password) => (
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
      <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>
        Update
      </button>
    </form>
  );

  render() {
    const { id, name, email, password, redirecttoprofile, error } = this.state;

    if (redirecttoprofile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className='container'>
        <div className='mt-5 mb-5'>Edit Profile</div>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;

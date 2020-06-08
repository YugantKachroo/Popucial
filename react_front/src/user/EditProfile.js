import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update } from './apiUser';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

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
      loading: false,
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
    this.userData = new FormData();
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
    const value =
      ename === 'photo' ? event.target.files[0] : event.target.value;
    this.userData.set(ename, value);
    this.setState({ [ename]: value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;
      update(userId, token, this.userData).then((data) => {
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
        <label className='text-muted'>Profile Photo</label>
        <input
          onChange={this.handleChange('photo')}
          type='file'
          accept='image/*'
          className='form-control'
        />
      </div>
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
    const {
      id,
      name,
      email,
      password,
      redirecttoprofile,
      error,
      loading,
    } = this.state;

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
          {loading ? <Spinner /> : ''}
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;

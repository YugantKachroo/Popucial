import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';
import { read } from './apiUser';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      redirect: false,
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirect: true });
      } else {
        this.setState({ user: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  render() {
    const { redirect, user } = this.state;
    if (redirect) {
      return <Redirect to='/signin' />;
    }

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              className='card-img-top'
              src={DefaultProfile}
              alt={user.name}
              style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
            />
          </div>
          <div className='col-md-6'>
            <div className='lead mt-2'>
              <p>Hello {user.name}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className='d-inline-block'>
                <Link
                  to={`/user/edit/${user._id}`}
                  className='btn btn-raised btn-success mr-5'
                >
                  Edit Profile
                </Link>
                <button className='btn btn-raised btn-danger'>
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

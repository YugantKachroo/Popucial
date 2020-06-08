import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import DefaultProfile from '../images/avatar.jpg';
import { read } from './apiUser';
import DeleteUser from './DeleteUser';

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
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  render() {
    const { redirect, user } = this.state;
    if (redirect) {
      return <Redirect to='/signin' />;
    }
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              style={{ height: '200px', width: 'auto' }}
              className='img-thumbnail'
              src={photoUrl}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>
          <div className='col-md-6'>
            <div className='lead mt-2'>
              <p>Hello {user.name}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className='d-inline-block mt-5'>
                <Link
                  to={`/user/edit/${user._id}`}
                  className='btn btn-raised btn-success mr-5'
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

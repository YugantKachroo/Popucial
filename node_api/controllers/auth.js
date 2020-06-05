const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJWT = require('express-jwt');

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(403).json({ error: 'Email is already taken' });
  }

  const user = await new User(req.body);

  await user.save();

  res.status(200).send({ message: 'Signup Success! Please Login' });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie('t', token, { expire: new Date() + 18000 });

    const { _id, name, email } = user;

    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  return res.json({ message: 'Signout Successful' });
};

exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

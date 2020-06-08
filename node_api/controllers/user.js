const User = require('../models/user');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User not found' });
    }

    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }

  next();
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(400).json({ error: err });
    }

    res.json(users);
  }).select('name email updated created');
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'The photo could not be uploaded' });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({ user });
    });
  });
};

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err) => {
    if (err) {
      return res.status(400).json({ error: "You're not authorized" });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

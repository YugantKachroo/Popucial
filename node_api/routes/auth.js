const express = require('express');
const { signup } = require('../controllers/auth');
const { userSignUpValidator } = require('../validator/index');

router = express.Router();

router.post('/signup', userSignUpValidator, signup);

module.exports = router;

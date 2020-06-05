const express = require('express');
const { signup, signin } = require('../controllers/auth');
const { userSignUpValidator } = require('../validator/index');

router = express.Router();

router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);

module.exports = router;

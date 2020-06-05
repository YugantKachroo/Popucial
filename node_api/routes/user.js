const express = require('express');
const { userById, allUsers } = require('../controllers/user');

router = express.Router();

router.get('/users', allUsers);

router.param('userId', userById);

module.exports = router;

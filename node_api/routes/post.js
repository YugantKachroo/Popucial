const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator/index');
const { userById } = require('../controllers/user');
router = express.Router();

router.get('/', getPosts);
router.post('/post', requireSignin, createPostValidator, createPost);
router.param('userId', userById);

module.exports = router;

const express = require('express');
const postController = require('../controllers/post');

router = express.Router();

router.get('./', postController.getPosts);

module.exports = router;

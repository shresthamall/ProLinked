const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const { postValidation, validate } = require('../middleware/validation');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, postValidation, validate], postController.createPost);

// @route   GET api/posts/user/:userId
// @desc    Get posts by user
// @access  Public
router.get('/user/:userId', postController.getPostsByUser);

module.exports = router;

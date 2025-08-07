const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { profileValidation, validate } = require('../middleware/validation');

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', userController.getUser);

// @route   PUT api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', [auth, profileValidation, validate], userController.updateProfile);

module.exports = router;

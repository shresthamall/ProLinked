const { validationResult } = require('express-validator');
const User = require('../models/User');

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ 
      message: 'Server error while processing your request',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// @route   PUT api/users/:id
// @desc    Update user profile
// @access  Private
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, bio } = req.body;
  const profileFields = {};
  
  if (name) profileFields.name = name;
  if (bio) profileFields.bio = bio;

  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Make sure user owns the profile
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

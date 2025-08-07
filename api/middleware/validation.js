const { body, validationResult } = require('express-validator');

exports.registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password cannot be empty').not().isEmpty()
];

exports.postValidation = [
  body('content', 'Content is required').not().isEmpty()
];

exports.profileValidation = [
  body('name', 'Name is required').not().isEmpty()
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

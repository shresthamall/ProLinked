const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add virtual for author's name and email
postSchema.virtual('authorInfo', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
  select: 'name email'
});

// Enable virtuals in toJSON output
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);

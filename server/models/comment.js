const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const commetSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 5,
    maxlength: 2000,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  time: {
    type: Date,
    min: Date.now,
    default: Date.now
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  }
});

function validateComment(comment) {
  const schema = Joi.object({
    text: Joi.String().required().minlegth(5).maxlength(2000),
    postedBy: Joi.ObjectId().required(),
    time: Joi.date().min('now').required(),
    postID: Joi.ObjectId().required()
  });

  return schema.validate(comment);
}

const Comment = mongoose.model('Comment', commetSchema);

module.exports = {
  Comment: Comment,
  validateComment: validateComment
}

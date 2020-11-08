const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  photo: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2000
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // comments: [{
  //   text: String,
  //   postedBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users',
  //   }
  // }],
  // likes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users',
  // }],
  
}, { timestamps: true });


function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(255),
    photo: Joi.string().required().min(10).max(255),
    body: Joi.string().required().min(5).max(2000),
    // postedBy: Joi.ObjectId().required(),
    // comments: Joi.array().items(Joi.ObjectId()),
    // likes: Joi.array().items(Joi.ObjectId()),
    // time: Joi.date().min('now')
  });

  return schema.validate(post);
}

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post: Post,
  validatePost: validatePost
}

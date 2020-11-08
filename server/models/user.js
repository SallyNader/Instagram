const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true
  // },
  // gender: {
  //   type: String,
  //   enum: ['male', 'female']
  // }
});

// userSchema.methods.generateToken = function() {
//   return jwt.sign({_id: this._id}, process.env.instagramKey);
// }

// function validateUser(user) {
//   const schema = Joi.object({
//     name: Joi.string().required().min(5).max(255),
//     email: Joi.string().required().min(5).max(255),
//     password: Joi.string().required().min(5).max(255),
//     image: Joi.string().required(),
//     gender: Joi.string().valid('male', 'female')
//   })

//   return schema.validate(user);
// }

const User = mongoose.model("User", userSchema);

module.exports = {
  User: User,
  // validateUser: validateUser
};

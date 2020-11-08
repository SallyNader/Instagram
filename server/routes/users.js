const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async(req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email is already registered...');


  let newUser = new User(_.pick(req.body, ['name', 'email', 'gender', 'image']));

  bcrypt.hash(req.body.password, 10).then(function(hash) {
    newUser.password = hash;
    newUser.save();
  });
  

  res.send(_.pick(newUser, ['name', 'email', 'gender', 'image']));
});


module.exports = router;
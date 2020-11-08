const express = require('express');
const { Post, validatePost } = require('../models/post');
const router = express.Router();
const _ = require('lodash');
const requireLogin = require('../middleware/requireLogin');

router.get('/all', async(req, res) => {
  const posts = await Post.find(). populate({ path: 'postedBy', select: 'name' });
  return res.json({posts});
});

router.get('/myPosts', requireLogin, async (req, res) => {
  console.log(req.user._id);
  const posts = await Post.find({ postedBy: req.user._id}).populate({ path: 'postedBy', select: 'name' });
  return res.json({posts});
});

router.post('/add', requireLogin, async(req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newPost =  new Post(_.pick(req.body, [
    'title',
    'body',
    'photo',
    // 'comments',
    // 'likes'
  ]));

  newPost.postedBy = req.user._id;
  await newPost.save();

  return res.send(_.pick(newPost, [
    '_id',
    'title',
    'photo',
    'body',
    'postedBy',
    // 'comments',
    // 'likes'
  ]));

});

router.get('/:id', async(req, res) => {
  let postID = req.params.id;
  if(!postID) return res.status(401).send('Can not find Post ID...');

  const post = await Post.findById(postID);

  return res.send(post);
});


router.put('/:id', requireLogin, async(req, res) => {
  let postID = req.params.id;
  if(!postID) return res.status(401).send('Can not find Post ID...');

  let user_id = req.user._id;

  let post = await Post.findOne({_id: postID});
  if(!post) return res.send('Invalide Post ID');

  // if (post.postedBy !== user_id) return res.send('You can not update this comment');
  
  const updatePost = Post.findByIdAndUpdate(postID, {
    $set: {
      description: req.body.description,
    },
  }, {new: true});

  return res.send(updatePost);


});

module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('index', { posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Render new post form
router.get('/new', (req, res) => {
  res.render('new');
});

// Create a new post
router.post('/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await newPost.save();
    res.redirect('/posts');
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

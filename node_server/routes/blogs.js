const express = require('express');
const router = express.Router();
const {fetchBlogs, fetchBlogsByTopics} = require('../controllers/blogs.js');
router.get('/fetch/:topic', fetchBlogs);
router.post('/fetchBlogs', fetchBlogsByTopics);
module.exports = router;
const express = require('express');
const router = express.Router();
const {signup, login} = require('../controllers/users.js')
router.get('/login', login);
router.get('/signup', signup);
module.exports = router;
const express = require('express');
const router = express.Router();
const {signup, login, validateToken } = require('../controllers/users.js')
router.post('/login', login);
router.post('/signup', signup);
router.post('/validate', validateToken);
module.exports = router;
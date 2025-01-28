const express = require('express');
const router = express.Router();
const {signup, login, validateToken, sync } = require('../controllers/users.js')
router.post('/login', login);
router.post('/signup', signup);
router.post('/validate', validateToken);
router.post('/sync', sync);
module.exports = router;
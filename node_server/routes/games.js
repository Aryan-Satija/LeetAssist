const express = require('express');
const router = express.Router();
const {gridGame, riddles} = require('../controllers/games.js')
router.get('/gridGame', gridGame);
router.get('/riddles', riddles);
module.exports = router;
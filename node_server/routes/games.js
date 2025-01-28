const express = require('express');
const router = express.Router();
const {gridGame, riddles, update} = require('../controllers/games.js')
const {debugging} =  require('../controllers/debugging.js');
router.get('/gridGame', gridGame);
router.get('/riddles', riddles);
router.post('/update', update);
router.get('/debuggingQuestions/:language', debugging);
module.exports = router;
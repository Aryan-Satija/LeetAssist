const express = require('express');
const router = express.Router();
const {fetchProblems, increment} = require('../controllers/potd.js');
router.post('/potd', fetchProblems);
router.post('/increment', increment);
module.exports = router;
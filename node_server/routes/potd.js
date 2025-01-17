const express = require('express');
const router = express.Router();
const {fetchProblems} = require('../controllers/potd.js');
router.post('/potd', fetchProblems);
module.exports = router;
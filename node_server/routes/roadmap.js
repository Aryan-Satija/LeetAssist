const express = require('express');
const router = express.Router();
const {Roadmap} = require('../controllers/roadmap.js');
router.post('/roadmap', Roadmap);
module.exports = router;
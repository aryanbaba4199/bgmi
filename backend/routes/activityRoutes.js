const express = require('express');
const router = express.Router();
const {getMatch, creatematch} = require('../controller/matches/match')

router.get('/matches/match', getMatch)
router.post('/matches/match', creatematch);


module.exports = router;
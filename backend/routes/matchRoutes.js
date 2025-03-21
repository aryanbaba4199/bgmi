const express = require('express');
const router = express.Router();
const {creatematch, getMatch, upcoming, bookingsData, createMatchRegistration, updateMatch, removeMatch, updateRoom} = require('../controller/matches/match');


router.get('/match/get', getMatch);
router.post('/match/create', creatematch);
router.put('/match/update', updateMatch);
router.delete('/match/remove/:id', removeMatch)
router.get('/match/matchesType/:status', upcoming)
router.get('/match/booking/:matchId', bookingsData), 
router.post('/match/booking', createMatchRegistration),
router.post('/match/updateRoom', updateRoom)

module.exports = router;
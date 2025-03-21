const express = require('express');
const router = express.Router();
const {login, signUp, myMatches, myProfile, updateProfile} = require('../controller/users/auth')

router.post('/login', login)
router.post('/signUp', signUp)
router.get('/myMatch', myMatches); 
router.get('/myprofile', myProfile);
router.put('/updateProfile', updateProfile)


module.exports = router;
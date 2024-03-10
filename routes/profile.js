const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { route } = require('./index.js');

// Define your routes here
router.get('/profile', profileController.profileView);
router.get('/editProfile', profileController.editProfileView);
router.post('/update_profile', profileController.updateprofilepicture);

router.post('/update_user', profileController.updateuser);
router.post('/update_password', profileController.updatepassword);

module.exports = router;
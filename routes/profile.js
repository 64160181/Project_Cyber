const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');

// Define your routes here
router.get('/profile', profileController.profileView);
router.get('/editProfile', profileController.editProfileView);

module.exports = router;
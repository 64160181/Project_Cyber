const express = require('express');
const SignupView = require('../controllers/signupController.js');
const registerView = require('../controllers/registerController.js');
const router = express.Router();


// Define your routes here
router.get('/signup', SignupView);
router.post('/registerUser', registerView);

module.exports = router;

const express = require('express');
const SignupView = require('../controllers/signupController.js');
const router = express.Router();


// Define your routes here
router.get('/signup', SignupView.signupView);
// router.post('/registerUser', registerView);
router.post('/registerUser',SignupView.ValidityState);

module.exports = router;
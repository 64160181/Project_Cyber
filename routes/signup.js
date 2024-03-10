const express = require('express');
const SignupView = require('../controllers/signupController.js');
const router = express.Router();

router.get('/signup', SignupView.signupView);
router.post('/registerUser',SignupView.ValidityState);

module.exports = router;
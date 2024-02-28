const express = require('express');
const SignupView = require('../controllers/signupController.js');
const router = express.Router();
const validationRule = require('../middlewares/validation-rule.js');


// Define your routes here
router.get('/signup', SignupView.signupView);
// router.post('/registerUser', registerView);
router.post('/registerUser',validationRule.form, SignupView.Validateform);

module.exports = router;

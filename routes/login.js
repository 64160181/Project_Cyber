const express = require('express');
const LoginView = require('../controllers/loginController.js');
const router = express.Router();

// Define your routes here
router.get('/login', LoginView);

module.exports = router;

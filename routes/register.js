const express = require('express');
const registerUser = require('../controllers/registerController.js');
const router = express.Router();

// Register route
router.post('/registerUser', registerUser);

module.exports = router;

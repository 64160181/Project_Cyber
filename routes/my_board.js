const express = require('express');
const myboardView = require('../controllers/myboardController.js'); // Fix the casing of the file name
const router = express.Router();

// Define your routes here
router.get('/my_board', myboardView.myboardView);

module.exports = router;

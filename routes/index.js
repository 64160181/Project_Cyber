const express = require('express');
const indexView = require('../controllers/indexController.js'); // Fix the casing of the file name
const router = express.Router();

// Define your routes here
router.get('/', indexView);

module.exports = router;

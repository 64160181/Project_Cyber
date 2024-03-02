const express = require('express');
const indexView = require('../controllers/indexController.js'); // Fix the casing of the file name
const router = express.Router();



router.get('/', indexView.indexView);

router.get('/logout', indexView.logout);

module.exports = router;

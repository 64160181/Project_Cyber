const express = require('express');
const adminController = require('../controllers/adminController.js');
const router = express.Router();

router.get('/adminBKB', adminController.adminView);
module.exports = router;

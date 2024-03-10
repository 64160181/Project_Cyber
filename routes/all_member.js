const express = require('express');
const all_memberController = require('../controllers/memberController.js');
const router = express.Router();

router.get('/all_member', all_memberController.all_memberview);
module.exports = router;
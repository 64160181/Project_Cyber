const express = require('express');
const postboardView = require('../controllers/postboardController.js'); // Fix the casing of the file name
const router = express.Router();


// Define your routes here
router.get('/post_board', postboardView.postboardView);
router.post('/add_new_post', postboardView.newpost);
module.exports = router;

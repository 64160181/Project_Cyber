const express = require('express');
const indexView = require('../controllers/indexController.js'); // Fix the casing of the file name
const router = express.Router();
const connection = require('../models/ConMysql.js');

// Define your routes here
// router.get('/', indexView.indexView);
router.get('/', indexView.indexView);
  
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error logging out: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;

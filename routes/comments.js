// const express = require('express');
// const router = express.Router();
// const connection = require('../models/ConMysql.js');

// router.get('/show_post', (req, res) => {
//     connection.query('SELECT * FROM comments', (error, results) => {
//         if (error) {
//             console.error('Error fetching comments:', error);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.render('show_post', { comments: results, user: req.session.user });
//         }
//     });
// });
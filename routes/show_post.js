const express = require('express');
const showpost = require('../controllers/showPostController.js');
const router = express.Router();
const connection = require('../models/ConMysql.js');

router.get('/show_post', (req, res) => {
    res.render('show_post', {
        user: req.session.user,
        postId: req.params.id,
    });
});
router.get('/show_post/:id', (req, res) => {
    connection.query('SELECT * FROM Posts WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error('Error fetching posts: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('show_post', { showPosts: results, user: req.session.user });
        }
    });
});
module.exports = router; 
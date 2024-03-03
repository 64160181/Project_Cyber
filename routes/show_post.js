const express = require('express');
const showpost = require('../controllers/showPostController.js');
const router = express.Router();
const connection = require('../models/ConMysql.js');

router.get('/show_post', (req, res) => {
    res.render('show_post', {
        user: req.session.user
    });
});

router.get('/show_post/:id', (req, res) => {
    connection.query('SELECT * FROM Posts WHERE id = ?', [req.params.id], (error , showpostresults) => {
        if (error) {
            console.error('Error fetching posts: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            connection.query('SELECT * FROM comments WHERE posts_id = ?', [req.params.id], (error, commentsresults) => {
                if (error) {
                    console.error('Error fetching comments:', error);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('show_post', { showPosts: showpostresults, user: req.session.user, comments: commentsresults });
                }
            });
        }
    });
});
module.exports = router;

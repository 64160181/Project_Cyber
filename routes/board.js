const express = require('express');
const postboardView = require('../controllers/boardController.js');
const router = express.Router();
const connection = require('../models/ConMysql.js');
const comment = require('../controllers/commentsController.js');


// Define your routes here
router.get('/post_board', postboardView.postboardView);
router.post('/add_new_post', postboardView.newpost);
router.get('/my_board', postboardView.myboardView);

router.get('/show_post', (req, res) => {
    res.render('show_post', {
        user: req.session.user,
        postId: req.params.id,
    });
});

router.get('/show_post/:id', (req, res) => {
    connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (error , showpostresults) => {
        if (error) {
            console.error('Error fetching posts: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            connection.query('SELECT * FROM comments WHERE posts_id = ?', [req.params.id], (error, commentsresults) => {
                if (error) {
                    console.error('Error fetching comments:', error);
                    res.status(500).send('Internal Server Error');
                } else {
                    const uid = showpostresults[0].Users_uid;
                    connection.query('SELECT * FROM users WHERE uid = ?',[uid], (error, userResults) => {
                        if (error) {
                            console.error('Error fetching users: ', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.render('show_post', { showPosts: showpostresults, comments: commentsresults, Users: userResults[0].username , user: req.session.user });
                        }
                    });
                }
            });
        }
    });
});

router.post('/comments', comment.newcomments);

router.post('/edit_post', postboardView.edit_post,postboardView.myboardView);
router.post('/delete_post', postboardView.delete_post,postboardView.myboardView);
router.post('/edit_post_view', postboardView.edit_post_view);
module.exports = router;
const express = require('express');
const postboardView = require('../controllers/boardController.js');
const router = express.Router();
const connection = require('../models/ConMysql.js');


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
    connection.query('SELECT * FROM Posts WHERE id = ?', [req.params.id], (error, results) => {
        if (error) {
            console.error('Error fetching posts: ', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('show_post', { showPosts: results, user: req.session.user });
        }
    });
});
router.post('/edit_post', postboardView.edit_post,postboardView.myboardView);
router.post('/delete_post', postboardView.delete_post,postboardView.myboardView);
module.exports = router;
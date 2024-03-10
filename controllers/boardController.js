const postmodel = require('../models/post');
const connection = require('../models/ConMysql.js');
const adminmodel = require('../models/admin');

const multer = require('multer');
const session = require('express-session');
const admin = require('../models/admin');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = {
    postboardView: (req, res) => {
        if (!req.session.user) {
            // Redirect to login page if user is not logged in
            return res.redirect('/login');
        }
        res.render('post_board', { user: req.session.user });
    },
    newpost: (req, res) => {
        upload.single('post_pic')(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            console.log(req.body);
            const inputData = {
                topic: req.body.topic,
                details: req.body.details,
                post_pic: req.file ? req.file.filename : null,
                users_uid: req.session.user.uid
            };
            postmodel.addNewPost(inputData.topic, inputData.details, inputData.post_pic, inputData.users_uid, (error) => {
                if (error) {
                    console.error('Error creating post:', error);
                    return res.status(500).json({
                        message: 'Internal Server Error',
                    });
                }
                res.redirect('/');
            });
        });
    },
    myboardView: (req, res) => {
        if (!req.session.user) {
            // Redirect to login page if user is not logged in
            return res.redirect('/login');
        } else {
            connection.query('SELECT * FROM Users', (error, userResults) => {
                if (error) {
                    console.error('Error fetching users: ', error);
                    res.status(500).send('Internal Server Error');
                } else {
                    connection.query('SELECT * FROM Posts', (error, postResults) => {
                        if (error) {
                            console.error('Error fetching posts: ', error);
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.render('my_board', { Users: userResults, Posts: postResults, user: req.session.user });
                        }
                    });
                }
            });
        }
    },
    edit_post: (req, res) => {
        upload.single('post_pic')(req, res, (err) => {
        console.log('req.body',req.body);
        const inputData = {
            topic: req.body.topic,
            details: req.body.details,
            post_pic: req.file ?  req.file.filename : null,
            post_id: req.body.post_id,
        };
        postmodel.editPost(inputData.topic, inputData.details, inputData.post_pic, inputData.post_id, (error, result) => {
            if (error) {
                console.error('Error editing post:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            res.redirect('/');
        });
    });
    },
    delete_post: (req, res) => {
        const inputData = {
            users_uid: req.session.user.uid,
            post_id: req.body.post_id,
        };
        adminmodel.disable_foreign_key((error, result) => {
            if (error) {
                console.error('Error disabling foreign key:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            } if (result) {
                console.log('inputData', inputData);
                postmodel.deletePost(inputData.users_uid, inputData.post_id, (error, result) => {
                    if (error) {
                        console.error('Error deleting post:', error);
                        return res.status(500).json({
                            message: 'Internal Server Error',
                        });
                    }
                    if (result) {
                        adminmodel.enable_foreign_key((error, result) => {
                            if (error) {
                                console.error('Error enabling foreign key:', error);
                                return res.status(500).json({
                                    message: 'Internal Server Error',
                                });
                            }
                            if (result) {
                                res.redirect('/');
                            }
                        });
                    }
                });
            }
        }
        );
    },
    edit_post_view : (req, res) => {
        connection.query('SELECT * FROM Posts WHERE id = ?', [req.body.post_id], (error, results) => {
            if (error) {
                console.error('Error fetching posts: ', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('edit_board', { post: results[0], user: req.session.user });
            }
        });
    }
};
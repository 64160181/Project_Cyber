const postmodel = require('../models/post');
const connection = require('../models/ConMysql.js');
module.exports = {
  postboardView: (req, res) => {
    if (!req.session.user) {
      // Redirect to login page if user is not logged in
      return res.redirect('/login');
    }
    res.render('post_board', { user: req.session.user });
  },
  newpost: (req, res) => {
    console.log(req.body);
    const inputData = {
      topic: req.body.topic,
      details: req.body.details,
      post_pic: req.body.post_pic,
      users_uid: req.session.user.uid,
    };
    postmodel.addNewPost(inputData.topic, inputData.details, inputData.post_pic, inputData.users_uid, (error, result) => {
      if (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({
          message: 'Internal Server Error',
        });
      }
      res.redirect('/');
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
    edit_post : (req, res) => {
        console.log(req.body);
        const inputData = {
            topic: 'test topic',
            details: 'test details',
            post_pic: 'test pic',
            users_uid: req.session.user.uid,
            post_id: req.body.post_id,
        };
        postmodel.editPost(inputData.topic, inputData.details, inputData.post_pic, inputData.users_uid, inputData.post_id, (error, result) => {
            if (error) {
                console.error('Error editing post:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            res.redirect('/');
        });

    },
    delete_post : (req, res) => {
        console.log(req.body);
        const inputData = {
            users_uid: req.session.user.uid,
            post_id: req.body.post_id,
        };
        postmodel.deletePost(inputData.users_uid, inputData.post_id, (error, result) => {
            if (error) {
                console.error('Error deleting post:', error);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
            res.redirect('/');
        });
    }
};
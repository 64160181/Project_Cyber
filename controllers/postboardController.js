const postmodel = require('../models/post');
// const connection = require('../models/ConMysql.js'); // Remove unused variable
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function(req, file, cb) {
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
      post_pic: req.file.filename,
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
    }
  }
  //   console.log(req.body);
  //   const inputData = {
  //     topic: req.body.topic,
  //     details: req.body.details,
  //     post_pic: req.file.filename, // Assuming you have a file upload middleware that saves the file and adds the filename to req.file
  //     users_uid: req.session.user.uid,
  //   };
  //   postmodel.addNewPost(inputData.topic, inputData.details, inputData.post_pic, inputData.users_uid, (error, result) => {
  //     if (error) {
  //       console.error('Error creating post:', error);
  //       return res.status(500).json({
  //         message: 'Internal Server Error',
  //       });
  //     }
  //     res.redirect('/');
  //   });
  // },
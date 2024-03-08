const commentsmodel = require('../models/comments.js');
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
const connection = require('../models/ConMysql.js');
module.exports = {
  showpostView: (req, res) => {
    res.render('show_post', { user: req.session.user });
  },
  newcomments: (req, res) => {
    upload.single('comment_pic')(req, res, (err) => {
      if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
      }
      console.log(req.body);
      const inputData = {
      topic: req.body.topic,
      detail: req.body ? req.body.detail : null,
      comment_pic: req.file ? req.file.filename : null,
      Posts_id: req.body.Posts_id,
      Posts_Users_uid: req.body.Posts_Users_uid,
      Users_uid: req.session.user.uid
      };
      commentsmodel.newcomments(inputData.topic, inputData.detail, inputData.comment_pic, inputData.Posts_id, inputData.Posts_Users_uid, inputData.Users_uid, (error) => {
      if (error) {
        console.error('Error creating comments:', error);
        return res.status(500).json({
        message: 'Internal Server Error',
        });
      }
    res.redirect(`/show_post/${inputData.Posts_id}`);
    });
    }
    )}
};
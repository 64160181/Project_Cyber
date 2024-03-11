const { reset } = require('nodemon');
const connection = require('./ConMysql');

module.exports = {
  // Query to get all comments
  getAllComments: (callback) => {
    const query = 'SELECT * FROM comments';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching comments:', error);
        return callback(error, null);
      }

      return callback(null, results);
    });
  },
  // Query to add a new comment
  newcomments: (topic, detail, comment_pic, Posts_id, Posts_Users_uid, Users_uid, callback) => {
    const query = 'INSERT INTO comments (topic, detail, comment_pic, Posts_id, Posts_Users_uid, Users_uid) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [topic, detail, comment_pic, Posts_id, Posts_Users_uid, Users_uid];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating comment:', error);
        return callback(error, null);
      }

      return callback(null, results);
    });
  },
  deletecomments: (id, Posts_id, Posts_Users_uid, Users_uid, callback) => {
    const query = 'DELETE FROM comments WHERE id = ?';
    const values = [id];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting comment:', error);
        return callback(error, null);
      }
      console.log('Deleted comment successfully', results);
      return callback(null, results);
    });
  },
  editcomments: (topic, detail, comment_pic, id, Posts_id, Posts_Users_uid, Users_uid, callback) => {
    const query = 'UPDATE comments SET topic = ?, detail = ?, comment_pic = ? WHERE id = ?';
    const values = [topic, detail, comment_pic, id];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating comment:', error);
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

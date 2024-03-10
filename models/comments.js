const { reset } = require('nodemon');
const connection = require('./ConMysql');

module.exports = {
  // Query to get all commetns
  getAllcomments: (callback) => {
    const query = 'SELECT * FROM comments';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching comments:', error);
        return callback(error, null);
      }

      return callback(null, results);
    });
  },
  // Query to add a new comments
  newcomments: (topic, detail, comment_pic, Posts_id, Posts_Users_uid, Users_uid, callback) => {
    const query = `INSERT INTO comments (topic, detail, comment_pic, Posts_id, Posts_Users_uid, Users_uid) VALUES ('${topic}', '${detail}', '${comment_pic}', '${Posts_id}', '${Posts_Users_uid}', '${Users_uid}')`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error creating comments:', error);
        return callback(error, null);
      }

      return callback(null, results);
    });
  },
  deletecomments: (id, callback) => {
    const query = `DELETE FROM comments WHERE id = '${id}'`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error deleting comments:', error);
        return callback(error, null);
      }
      console.log('Deleted comments successfully',results);
      return callback(null, results);
    });
  },
  editcomments: (topic, detail, comment_pic, id, callback) => {
    const query = `UPDATE comments SET topic = '${topic}', detail = '${detail}', comment_pic = '${comment_pic}' WHERE id = '${id}'`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error updating comments:', error);
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
}
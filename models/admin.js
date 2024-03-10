const connection = require('./ConMysql');
const bcypt = require('bcrypt');
module.exports = {
    showUser: function (req, res) {
        connection.query('SELECT * FROM Users', (error, results) => {
            if (error) {
                console.error('Error fetching posts: ', error);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('admin', { users: results, user: req.session.user});
            }
        });
    },
    userView: function(inputData, callback) {
        const { uid } = inputData;
        const query = `SELECT * FROM users WHERE uid = '${uid}'`;

        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching user:', error);
                return callback(error, null);
            }

            if (results.length > 0) {
                return callback(null, results[0]);
            }

            return callback(null, null);
        });
    },
    updateUser : function(inputData, callback) {
        const { uid, display_name, username, email } = inputData;
        const query = `UPDATE users SET display_name = '${display_name}', username = '${username}', email = '${email}' WHERE uid = '${uid}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error updating user:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    },
    updatePassword : function(inputData, callback) {
        const { uid, newpassword } = inputData;
        const salt = bcypt.genSaltSync(10);
        const hash = bcypt.hashSync(newpassword, salt);
        const query = `UPDATE users SET password = '${hash}' WHERE uid = '${uid}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error updating password:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    },
    deleteUser : function(inputData, callback) {
        const { uid } = inputData;
        const query = `DELETE FROM users WHERE uid = '${uid}'`;
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    },
    disable_foreign_key : function (callback) {
        const query = 'SET FOREIGN_KEY_CHECKS=0';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    },
    enable_foreign_key : function(callback) {
        const query = 'SET FOREIGN_KEY_CHECKS=1';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error:', error);
                return callback(error, null);
            } 
            
            return callback(null, results);
        });
    }
};
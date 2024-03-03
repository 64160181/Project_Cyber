const connection = require('./ConMysql');
const bcypt = require('bcrypt');
module.exports = {
    createUser: function(inputData) {
        const { username, email, password } = inputData;
        const salt = bcypt.genSaltSync(10);
        const hash = bcypt.hashSync(password, salt);
        const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}')`;
        
        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error creating user:', error);
        } else {
            console.log('User created successfully');
        }
        });
    },
    validateUsername: function(inputData, callback) {
        const { username } = inputData;
        const query = `SELECT * FROM users WHERE username = '${username}'`;
    
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
    validateEmail: function(inputData, callback) {
        const { email } = inputData;
        const query = `SELECT * FROM users WHERE email = '${email}'`;
    
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
    login: function(inputData, callback) {
        const { username, password } = inputData;
        const query = `SELECT * FROM users WHERE username = '${username}'`;
    
        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching user:', error);
            return callback(error, null);
        }
    
        if (results.length > 0) {
            const user = results[0];
            const isPasswordMatch = bcypt.compareSync(password, user.password);
            if (isPasswordMatch) {
            return callback(null, user);
            }
        }
    
        return callback(null, null);
        });
    },
    updateUser: function(inputData, callback) {
        const { username,email,uid,display_name } = inputData;
        const query = `UPDATE users SET username = '${username}', email = '${email}', display_name = '${display_name}' WHERE uid = '${uid}'`;

        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error updating user:', error);
            return callback(error, null);
        }

        if (results.affectedRows > 0) {
            return callback(null, inputData);
        }

        return callback(null, null);
        });   
    },
    updatePassword : function(inputData, callback) {
        console.log(inputData);
        const { uid,newpassword,confirmpassword } = inputData;
        const salt = bcypt.genSaltSync(10);
        const hash = bcypt.hashSync(newpassword, salt);
        const query = `UPDATE users SET password = '${hash}' WHERE uid = '${uid}'`;

        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error updating password:', error);
            return callback(error, null);
        }

        if (results.affectedRows > 0) {
            return callback(null, inputData);
        }

        return callback(null, null);
        });   
    },
    validateUsernameUpdate : function(inputData, callback) {
        const { username,uid } = inputData;
        const query = `SELECT * FROM users WHERE username = '${username}' AND uid != '${uid}'`;

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
    validateEmailUpdate : function(inputData, callback) {
        const { email,uid } = inputData;
        const query = `SELECT * FROM users WHERE email = '${email}' AND uid != '${uid}'`;

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
};
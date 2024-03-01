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
    }

};
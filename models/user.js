// const mysql = require('mysql');
// const connection = require('./ConMysql');
// // Function to create a user in MySQL
// function createUser(user) {
//   const { username, email, password } = user;
//   const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error creating user:', error);
//     } else {
//       console.log('User created successfully');
//     }
//   });
// }

// module.exports = createUser;

// ------------------------------
const connection = require('./ConMysql');
module.exports = {
    createUser: function(user) {
        const { username, email, password } = user;
        const query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    
        connection.query(query, (error, results) => {
        if (error) {
            console.error('Error creating user:', error);
        } else {
            console.log('User created successfully');
        }
        });
    }
    };

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
  });
  
  // Connect to the MySQL database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database: ', error);
    } else {
      console.log('Connected to the database');
    }
  });
  
module.exports = connection;

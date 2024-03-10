const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password:  process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'mydb',
    port: process.env.DB_PORT || 3306
  });
  
  console.log('DB_HOST: ', process.env.DB_HOST);
  // Connect to the MySQL databased
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database: ', error);
    } else {
      console.log('Connected to the database');
    }
  });
  
module.exports = connection;
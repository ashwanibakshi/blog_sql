const mysql = require('mysql');

// Create the connection pool. The pool-specific settings are the defaults
var connect = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'blogg',
});

 module.exports = connect; 

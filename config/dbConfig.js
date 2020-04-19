const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mini-crm'
});


dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database")
});

module.exports = dbConnection;
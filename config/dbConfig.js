const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const dbConnection = mysql.createConnection({
  host     : process.env.HOST || 'localhost',
  user     : process.env.USER || 'root',
  password : process.env.PASSWORD || '',
  database : process.env.DATABASE || 'mini-crm'
});


dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database")
});

module.exports = dbConnection;
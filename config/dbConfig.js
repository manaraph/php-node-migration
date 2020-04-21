const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = mysql.createConnection({
  host     : process.env.HOST || 'localhost',
  user     : process.env.USER || 'root',
  password : process.env.PASSWORD || '',
  database : process.env.DATABASE || 'mini-crm'
});

dbConnection.connect( err => {
  if(err) {   
    console.log('error when connecting to db:', err);
    setTimeout(handleDisconnect, 2000); 
  }
  console.log("Connected to database")
});

const handleDisconnect = () => {
  const dbConnection = mysql.createConnection({
    host     : process.env.HOST || 'localhost',
    user     : process.env.USER || 'root',
    password : process.env.PASSWORD || '',
    database : process.env.DATABASE || 'mini-crm'
  });
  
  dbConnection.connect( err => {
    if(err) { 
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log("Connected to database")
  });                                     

  dbConnection.on('error', err => {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

module.exports = dbConnection;
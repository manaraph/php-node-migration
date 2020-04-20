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
  if(err) {       // or restarting (takes a while sometimes).
    console.log('error when connecting to db:', err);
    setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
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
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
    console.log("Connected to database")
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  dbConnection.on('error', err => {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

module.exports = dbConnection;
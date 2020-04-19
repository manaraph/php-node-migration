const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const sql = require('../config/dbConfig');

dotenv.config();

const createAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const saltRounds = process.env.saltRounds || 8;

  if(!email || !password) {
    res.status(422).send({ error: 'You must provide an email and a password.'})
  }

  bcrypt.hash(password, saltRounds).then( hash => {   
    sql.query("INSERT INTO admin SET email = ?, password = ?", [email, hash], (err, result) => {
      if (err) {
        console.log("error: ", err);
        // next(err, null);
        res.json({ error: 'Error saving user to the database' });
      }
  
      res.json({ 
        info: "Admin created", 
        id: result.insertId, 
        email
      });
  
    });
  }).catch( err => {
    return next(err);
  });
}

module.exports = {
  createAdmin
}
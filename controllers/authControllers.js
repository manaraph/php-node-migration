const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const sql = require('../config/dbConfig');

dotenv.config();

const signIn = (req, res) => {
  const { email, password } = req.body;

  //check if email and password is empty
  if(!email || !password){
    return res.status(422).send({ error: 'You must provide an email and a password.'});
  }
  //check email validity
  const checkedEmail = /\S+@\S+\.\S+/.test(email);
  if(!checkedEmail){
    return res.status(400).json({message: 'Please enter a valid email'})
  }
  //If email is correct then run query
  sql.query("SELECT * FROM admin WHERE email = ? ", email, (err, result) => {
    if(err){ 
      console.log(err);
      return res.json({ error: 'There was an error signing in user.' });
    }
    //If no row was found
    if(!result.length){
      return res.status(400).json({message: 'The credentials you provided is incorrect'})
    }
    //check if the password match the hashed password in database
    let dbpass = result[0].password;
    bcrypt.compare(password, dbpass).then(valid => {
      if(!valid){
        return res.status(400).json({message: 'The credentials you provided is incorrect'}) 
      }

      jwt.sign({ email }, process.env.SECRET, {expiresIn: '7d'}, (err, token) => {
        return res.status(200).json({
        message: 'success',
        data: {
          token,
          userId: result[0].id
          }
        });
      });
    }).catch(error => res.status(500).json({ error }));
  })
};

const createAdmin = (req, res, next) => {
  const { email, password } = req.body;
  const saltRounds = process.env.saltRounds || 8;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and a password.'})
  }

  //check email validity
  const checkedEmail = /\S+@\S+\.\S+/.test(email);
  if(!checkedEmail){
    return res.status(400).json({message: 'Please enter a valid email'})
  }

  bcrypt.hash(password, saltRounds).then( hash => {   
    sql.query("INSERT INTO admin SET email = ?, password = ?", [email, hash], (err, result) => {
      if (err) {
        console.log("error: ", err);
        // next(err, null);
        return res.json({ error: 'Error saving user to the database' });
      }
  
      jwt.sign({ email }, process.env.SECRET, {expiresIn: '7d'}, (err, token) => {
        return res.status(201).json({
          message: 'success',
          data: {
            token,
            userId: result.insertId, 
            }
        })
      });
    });
  }).catch( err => {
    return next(err);
  });
}

module.exports = {
  createAdmin,
  signIn
}
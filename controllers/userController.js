const sql = require('../config/dbConfig');

const getAllUsers = (req, res, next) => {
  sql.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error fetching users to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        users: result
      }
    });
  });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  sql.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error fetching users to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        users: result
      }
    });
  });
};

const createUser = (req, res, next) => {
  const { firstname, lastname, email, phone } = req.body;
  sql.query("INSERT INTO users SET firstname = ?, lastname = ?, email = ?, phone = ?", [firstname, lastname, email, phone ], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error saving User to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        userId: result.insertId
      }
    });
  });
};


module.exports = {
  getAllUsers,
  getUser,
  createUser,
}
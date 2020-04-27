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
  const { companyId } = req.params;
  sql.query("INSERT INTO users SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ?", [firstname, lastname, companyId, email, phone ], (err, result) => {
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

const updateUser = async (req, res, next) => {
  const { firstname, lastname, company, email, phone } = req.body;
  const { userId } = req.params;
  await sql.query("UPDATE users SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ? WHERE id = ?", [firstname, lastname, company, email, phone, userId ], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error updating User' });
    }

    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "User not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        userId,
        firstname, 
        lastname, 
        company, 
        email, 
        phone
      }
    });
  });
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  await sql.query("DELETE FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).json({ error: 'Error deleting user' });
    }
        
    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "User not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        userId
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
const sql = require('../config/dbConfig');

const createCompany = (req, res, next) => {
  const { name, email, logo, website } = req.body;
  sql.query("INSERT INTO companies SET name = ?, email = ?, website = ?", [name, email, website], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      res.json({ error: 'Error saving company to the database' });
    }

    res.status(200).json({
      message: 'success',
      data: {
        companyId: result.insertId
      }
    });
  });
};

module.exports = {
  createCompany,
}
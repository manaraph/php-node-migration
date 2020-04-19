const sql = require('../config/dbConfig');

const getCompanies = (req, res, next) => {
  sql.query("SELECT * FROM companies", (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      res.json({ error: 'Error fetching companies to the database' });
    }

    res.status(200).json({
      message: 'success',
      data: {
        companies: result
      }
    });
  });
};

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
  getCompanies,
  createCompany,
}
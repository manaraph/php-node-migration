const sql = require('../config/dbConfig');

const getCompanies = (req, res, next) => {
  sql.query("SELECT * FROM business_information", (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error fetching business to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        businesses: result
      }
    });
  });
};

const createCompany = (req, res, next) => {
  const { busineessName, email, website, description, business_addr } = req.body;
  sql.query("INSERT INTO business_information SET busineessName = ?, email = ?, website = ?, description = ?, business_addr = ?", [busineessName, email, website, description, business_addr], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error saving buiness to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        businessId: result.insertId
      }
    });
  });
};


module.exports = {
  getCompanies,
  createCompany
}
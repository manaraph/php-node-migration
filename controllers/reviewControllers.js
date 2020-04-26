const sql = require('../config/dbConfig');

const createReview = (req, res, next) => {
  const { firstname, lastname, email, phone } = req.body;
  const { companyId } = req.params;
  sql.query("INSERT INTO business_reviews SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ?", [firstname, lastname, companyId, email, phone ], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error saving Employee to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        employeeId: result.insertId
      }
    });
  });
};
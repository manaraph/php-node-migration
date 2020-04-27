const sql = require('../config/dbConfig');

const createReview = (req, res, next) => {
  const { businessId, reviewer, review } = req.body;
  sql.query("INSERT INTO reviews SET businessId = ?, reviewer = ?, review = ?", [businessId, reviewer, review ], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error saving review to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        businessId, 
        reviewer, 
        review
      }
    });
  });
};

module.exports = {
  createReview,
}
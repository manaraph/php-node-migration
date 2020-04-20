const sql = require('../config/dbConfig');

const getCompanies = (req, res, next) => {
  sql.query("SELECT * FROM companies", (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.json({ error: 'Error fetching companies to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        companies: result
      }
    });
  });
};

const createCompany = (req, res, next) => {
  const { name, email, logo, website } = req.body;
  sql.query("INSERT INTO companies SET company_name = ?, email = ?, website = ?", [name, email, website], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.json({ error: 'Error saving company to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        companyId: result.insertId
      }
    });
  });
};

const updateCompany = async (req, res, next) => {
  const { name, email, website } = req.body;
  const { id } = req.params;
  await sql.query("UPDATE companies SET company_name = ?, email = ?, website = ? WHERE id = ?", [name, email, website, id], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.json({ error: 'Error updating company' });
    }

    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "company not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        companyId: id,
        companyName: name, 
        email, 
        website
      }
    });
  });
};

const deleteCompany = async (req, res, next) => {
  const { id } = req.params;
  await sql.query("DELETE FROM companies WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.json({ error: 'Error deleting company' });
    }
        
    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "company not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        companyId: id
      }
    });
  });
};

module.exports = {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
}
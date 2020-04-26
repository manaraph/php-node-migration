const sql = require('../config/dbConfig');

const getAllEmployees = (req, res, next) => {
  sql.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error fetching employees to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        employees: result
      }
    });
  });
};

const getEmployees = (req, res, next) => {
  const { companyId } = req.params;
  sql.query("SELECT * FROM employees WHERE company = ?", companyId, (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error fetching employees to the database' });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        employees: result
      }
    });
  });
};

const createEmployee = (req, res, next) => {
  const { firstname, lastname, email, phone } = req.body;
  const { companyId } = req.params;
  sql.query("INSERT INTO employees SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ?", [firstname, lastname, companyId, email, phone ], (err, result) => {
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

const updateEmployee = async (req, res, next) => {
  const { firstname, lastname, company, email, phone } = req.body;
  const { employeeId } = req.params;
  await sql.query("UPDATE employees SET firstname = ?, lastname = ?, company = ?, email = ?, phone = ? WHERE id = ?", [firstname, lastname, company, email, phone, employeeId ], (err, result) => {
    if (err) {
      console.log("error: ", err);
      // next(err, null);
      return res.status(400).json({ error: 'Error updating Employee' });
    }

    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        employeeId,
        firstname, 
        lastname, 
        company, 
        email, 
        phone
      }
    });
  });
};

const deleteEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  await sql.query("DELETE FROM employees WHERE id = ?", employeeId, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return res.status(400).json({ error: 'Error deleting employee' });
    }
        
    if (result.affectedRows == 0) {
      // not found Customer with the id
      return res.json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: 'success',
      data: {
        employeeId
      }
    });
  });
};

module.exports = {
  getAllEmployees,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
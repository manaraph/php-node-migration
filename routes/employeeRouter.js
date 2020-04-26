const express = require('express');
const router = express.Router();
const employee = require('../controllers/employeeController')

router.get('/', employee.getAllEmployees);
router.get('/:companyId', employee.getEmployees);
router.post('/:companyId', employee.createEmployee);
router.put('/:employeeId', employee.updateEmployee);
router.delete('/:employeeId', employee.deleteEmployee);

module.exports = router;
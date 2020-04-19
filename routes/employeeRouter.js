const express = require('express');
const router = express.Router();
const employee = require('../controllers/employeeController')

router.get('/', employee.getEmployees);
router.post('/', employee.createEmployee);
router.put('/:id', employee.updateEmployee);
router.delete('/:id', employee.deleteEmployee);

module.exports = router;
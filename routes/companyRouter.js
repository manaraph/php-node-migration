const express = require('express');
const router = express.Router();
const company = require('../controllers/companyController')

router.get('/', company.getCompanies);
router.post('/', company.createCompany);
router.put('/:id', company.updateCompany);
router.delete('/:id', company.deleteCompany);

module.exports = router;
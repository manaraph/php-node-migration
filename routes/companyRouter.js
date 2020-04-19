const express = require('express');
const router = express.Router();
const company = require('../controllers/companyController')

router.get('/', company.createCompany);
router.post('/', company.createCompany);

module.exports = router;
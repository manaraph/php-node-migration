const express = require('express');
const router = express.Router();
const business = require('../controllers/businessController')

router.get('/', business.getCompanies);
router.post('/', business.createCompany);

module.exports = router;
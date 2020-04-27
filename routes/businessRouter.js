const express = require('express');
const router = express.Router();
const business = require('../controllers/businessController')

router.get('/', business.getCompanies);
router.post('/', business.createCompany);
router.put('/:id', business.updateCompany);
router.delete('/:id', business.deleteCompany);

module.exports = router;
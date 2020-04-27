const express = require('express');
const router = express.Router();
const review = require('../controllers/reviewControllers')
const validation = require('../middleware/validator');

router.post('/', validation.review, review.createReview);

module.exports = router;
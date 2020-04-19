const express = require('express');
const router = express.Router();
const auth = require('../controllers/authControllers')

router.post('/signup', auth.createAdmin);

router.post('/signin', (req, res) => {

});

module.exports = router;
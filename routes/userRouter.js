const express = require('express');
const router = express.Router();
const user = require('../controllers/userController')

router.get('/', user.getAllUsers);
router.post('/', user.createUser);
router.get('/:userId', user.getUser);

module.exports = router;
  
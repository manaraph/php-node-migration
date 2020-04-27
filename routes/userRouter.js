const express = require('express');
const router = express.Router();
const user = require('../controllers/userController')

router.get('/', user.getAllUsers);
router.post('/', user.createUser);
router.get('/:userId', user.getUser);
router.put('/:userId', user.updateUser);
router.delete('/:userId', user.deleteUser);

module.exports = router;
  
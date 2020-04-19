const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: "Welcome to this Mini CRM app"
  })
});
router.post('/signin', (req, res) => {

});

module.exports = router;
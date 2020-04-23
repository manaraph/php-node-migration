const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const companyRouter = require('./routes/companyRouter');
const employeeRouter = require('./routes/employeeRouter');
const verifyToken = require('./middleware/verifyToken');
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: "welcome to this mini-crm API"
  })
});

//Setup our mini-crm auth Router
app.use('/api/v1/auth', authRouter );

//Setup our mini-crm company Router
app.use('/api/v1/company', verifyToken, companyRouter );

//Setup our mini-crm employee Router
app.use('/api/v1/employee', verifyToken, employeeRouter );

// Handle undefined routes
app.use('*', (_req, res) => {
  res.json({
    success: false,
    message: 'Resource not available'
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const companyRouter = require('./routes/companyRouter');
const employeeRouter = require('./routes/employeeRouter');

const port = process.env.PORT || 5000;
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTENDURL || 'http://localhost:3000'}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: "welcome to this mini-crm API"
  })
});

//Setup our mini-crm auth Router
app.use('/api/v1/auth', authRouter );

//Setup our mini-crm company Router
app.use('/api/v1/company', companyRouter );

//Setup our mini-crm employee Router
app.use('/api/v1/employee', employeeRouter );

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
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter');
const companyRouter = require('./routes/companyRouter');
const employeeRouter = require('./routes/employeeRouter');

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTENDURL || 'http://localhost:3000'}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


//Setup our mini-crm auth Router
app.use('/api/v1/auth', authRouter );

//Setup our mini-crm company Router
app.use('/api/v1/company', companyRouter );


app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
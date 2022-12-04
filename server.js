const express = require('express')

const calculatorRoute = require('./src/routes/calculator');

const app = express();

//Define Routes
app.use('/', calculatorRoute);

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({
      error: true,
      message: error.message || 'An unknown error occurred!',
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
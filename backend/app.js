const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

require('./server/routes/routes')(app);
app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Welcome to Twittest!!'
  })
);

module.exports = app;

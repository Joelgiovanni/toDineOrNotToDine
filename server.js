const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

app = express();

var router = require('./routing/routes');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes / Router
app.get('/ip', (req, res, next) => {
  axios
    .get('https://api.ipify.org?format=json')
    .then(data => {
      return res.json(res.data.ip);
    })
    .catch(err => next(err));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

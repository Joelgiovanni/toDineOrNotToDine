const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request-promise-native');

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

//   next();
// });

app.get('/', (req, res) => {
  // axios
  //   .get(
  //     'https://developers.zomato.com/api/v2.1/geocode?lat=39.7692802&lon=-105.0640723',
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Accept: 'application/json',
  //         'user-key': '1062f6965a8e3100b4d2f44709cb9bc4'
  //       }
  //     }
  //   )
  //   .then(res => {
  //     const name = res.data.nearby_restaurants[0].restaurant.name;
  //     console.log(name);
  //   })
  //   .catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

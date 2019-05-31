// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// // @route   GET
// // @desc    TEST
// // @access  Public
// // URL: http://localhost:5000/api/test
// router.get('/test', (req, res) => {
//   return res.send({ Succes: true });
// });

// module.exports = router;

// // @route   GET
// // @desc    GET IP
// // @access  Public
// // URL: http://localhost:5000/api/ip
// router.get('/', (req, res) => {
//   // Get the IP adress of user
//   axios
//     .get('https://api.ipify.org?format=json')
//     .then(res => {
//       return console.log(res);
//     })
//     .catch(err => {
//       return res.send(err);
//     });
// });

// module.exports = router;

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/product', (req, res) => {
  let id = req.query.id;
  console.log()
  axios({
    method: 'get',
    url: `${API_URL}/products/${id}`,
    headers: {
      Authorization: process.env.API_TOKEN
    }
  }).then(function (response) {
    console.log('api response: ', response);
  }).catch(function (error) {
    console.log('api request error: ', error);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios')

const reviewURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews'

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', {
    headers: {
      'Authorization': process.env.API_TOKEN,
      'product_id': 47421
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

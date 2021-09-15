const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const ANNA_API_TOKEN = require('./relatedProducts/config.js');
const axios = require('axios');

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

/*
  ----------------------------
  | RelatedProducts Routes |
  ----------------------------
*/

let retrieveRelatedProducts = (relatedProductIds) => {
  let promisesArray = [];
  for (var i = 0; i < relatedProductIds.length; i++) {
    let currentProduct = relatedProductIds[i];
    let APIRequest = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${currentProduct}`, {
      headers: {
        'Authorization': ANNA_API_TOKEN,
        'product_id': currentProduct
      }
    });
    promisesArray.push(APIRequest);
  }
  console.log('the array of many promises: ', promisesArray);
  let productInfo = Promise.all(promisesArray)
  return productInfo;

}


app.get('/relatedProducts', (req, res) => {
  console.log('this is the req coming in from the client with product id: ', req.query.defaultProductId);
  let parentProductId = Number(req.query.defaultProductId);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/47421/related', {
    headers: {
      'Authorization': ANNA_API_TOKEN,
      'product_id': parentProductId
    }
  })
    .then((relatedProducts) => {
      console.log('success getting related products array on server from API: ', relatedProducts.data);
      return retrieveRelatedProducts(relatedProducts.data)
    })
    .then((arrayOfResponses) => {
      let data = arrayOfResponses.map(res => {
        return res.data
      })
      console.log('success getting related products info from helper fn: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error getting related products array on server from API: ', error);
      res.sendStatus(500);
    })
});







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





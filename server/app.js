require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
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
let retrieveRelatedProductsStyles = (relatedProductIds) => {
  let stylesPromisesContainer = [];
  for (var i = 0; i < relatedProductIds.length; i++) {
    let currentProduct = relatedProductIds[i];
    let stylesAPIRequest = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${currentProduct}/styles`, {
      headers: {
        'Authorization': process.env.API_TOKEN,
        'product_id': currentProduct
      }
    });
    stylesPromisesContainer.push(stylesAPIRequest);
  }
  console.log('the array of styles promises: ', stylesPromisesContainer);
  let productStylesInfo = Promise.all(promisesArray)
  return productStylesInfo;
}

let retrieveRelatedProducts = (relatedProductIds) => {
  let promisesArray = [];
  for (var i = 0; i < relatedProductIds.length; i++) {
    let currentProduct = relatedProductIds[i];
    let APIRequest = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${currentProduct}`, {
      headers: {
        'Authorization': process.env.API_TOKEN,
        'product_id': currentProduct
      }
    });
    promisesArray.push(APIRequest);
  }
  console.log('the array of many promises: ', promisesArray);
  let productInfo = Promise.all(promisesArray)
  return productInfo;

}

//get related product ids and related product info
app.get('/relatedProducts', (req, res) => {
  console.log('this is the req coming in from the client with product id: ', req.query.defaultProductId);
  let parentProductId = Number(req.query.defaultProductId);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/47421/related', {
    headers: {
      'Authorization': process.env.API_TOKEN,
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


//get related product styles and images
app.get('/relatedProductImages', (req, res) => {
  axios.get()
})
//----------------------------------------------------- END RELATED PRODUCTS--------------------------------------






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





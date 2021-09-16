require('dotenv').config();
//process.env.API_TOKEN
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios')
const reviewURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews'
const QuestionAnswer_API = require('./questionAnswer');
const bodyParser = require('body-parser');


app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
//----------------------------------------------------- END RELATED PRODUCTS--------------------------------------


//CS- Questions & Answer START------------------------------------------------------------
app.get('/api/qa', (req, res) => {
  QuestionAnswer_API.getQuesAns(47421,(err, data)=> {
    if(err){
      res.status(500).send(err);
    }else {
      // console.log('Before send', data)
      const twoData=[];
      for(let i =0; i< 2; i++){
        twoData.push(data[i])
      }
      // console.log('Data before send to client->', twoData)
      res.send(twoData);
    }
  })
});
//CS- Question & Answer END----------------------------------------------------------------------



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





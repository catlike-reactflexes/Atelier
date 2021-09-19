require('dotenv').config();
//process.env.API_TOKEN
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios')
const reviewURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews'
// const QuestionAnswer_API = require('./questionAnswer');
const bodyParser = require('body-parser');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
// app.get('/product', (req, res) => {
//   let id = req.query.id;
//   console.log()
//   axios({
//     method: 'get',
//     url: `${API_URL}/products/${id}`,
//     headers: {
//       Authorization: process.env.API_TOKEN
//     }
//   }).then(function (response) {
//     console.log('api response: ', response);
//   }).catch(function (error) {
//     console.log('api request error: ', error);
//   })
// });
/*
  ----------------------------
  | RelatedProducts Routes |
  ----------------------------

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
*/

//CS- Questions & Answer START------------------------------------------------------------
app.get('/api/qa/id=*', (req, res) => {
  console.log('request-->', req.query.product_id, req.query.previousQuesId) ;
  // console.log('request-->', req.path) ;

  axios({
        method: 'get',
        url: `${API_URL}/qa/questions`,
        headers: {
          Authorization: process.env.API_TOKEN
        },
        params: {
          product_id: req.query.product_id
        }
      }).then(function (response) {
        console.log('api response: ', response.data);

        res.status(200).send(response.data.results);
      }).catch(function (err) {
        console.log('api request error: ', err);
        res.status(500).send(err);
      })

});

app.put('/update', (req, res) => {
  console.log('request-->', req.body.data)
  const {questionid} = req.body.data;
  const {answerid} = req.body.data;
  let urlPut, idHelpfulness ;
  if(questionid){
    urlPut = `${API_URL}/qa/questions/${questionid}/helpful`;
    idHelpfulness = {question_id : questionid};
  } else {
    urlPut = `${API_URL}/qa/answers/${answerid}/helpful`;
    idHelpfulness = {answer_id : answerid}
  }
  // console.log('request-->',question_id)
  axios({
    method: 'put',
    url: urlPut,
    data: idHelpfulness,
    headers: {
      Authorization: process.env.API_TOKEN
    }

  })
    .then(function (response) {
    //looking for 204 to get update
    console.log('api response--> ', response.status);
    res.sendStatus(response.status);
  })
    .catch(function (err) {
    console.log('api request error--> ', err);
    res.status(404).send(err);
  })
//  const urlPut = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/3715584/helpful';
//  const dataPut = {
//   answer_id:3715584
//  }
//  axios.put(urlPut, dataPut,{headers:{"Authorization": Github_Token }})
//   .then(response => {
//     console.log('Axios success',response.status, response.statusText,response.data);
//     // callback(null, response.data);
//   })
//   .catch(error => {
//     console.log('Axios failed',error);
//     // callback(error, null);
//   })
})

//CS- Question & Answer END----------------------------------------------------------------------



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





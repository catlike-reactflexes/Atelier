require('dotenv').config();
//process.env.API_TOKEN
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios')
const $ = require('jquery')
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

/*
  ----------------------------
  | Review Routes |
  ----------------------------
*/

app.get('/reviews', (req, res) => {
  // console.log('reviews api token: ', process.env.API_TOKEN)
  let product_id = Number(req.query.productID)
  // console.log(typeof product_id)
  let config = {
    headers: {'Authorization': process.env.API_TOKEN},
    params: {'product_id': product_id}
  }
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', config)
    .then(data => {
      console.log('api response: ', data.data.results);
      res.json(data.data)
    })
    .catch(err => {
      console.log('review get error: ', err)
      throw err
    })
})

app.get('/reviewmeta', (req, res) => {
  let product_id = Number(req.query.productID)
  let config = {
    headers: {'Authorization': process.env.API_TOKEN},
    params: {'product_id': product_id}
  }
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta', config)
  .then(metadata => {
    // console.log('meta api response: ', metadata.data);
    res.json(metadata.data)
  })
  .catch(err => {
    console.log('review get error: ', err)
    throw err
  })
})

app.get('/reviewhelpful', (req, res) => {
  let config = {
    headers: {'Authorization': process.env.API_TOKEN}
  }
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/helpful`,
    data: {review_id: req.query.review_id},
    headers: {
      Authorization: process.env.API_TOKEN
    }

  })
  .then(response => {
    console.log('helpful api response ', response.status)
    res.send(response)
  })
  .catch(err => {
    res.sendStatus(404)
    // console.log('helpful review put error: ', err)
  })
})

app.get('/reviewreport', (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/report`
  console.log('report url, ', url)
  let config = {
    headers: {'Authorization': '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'},
  }

  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/report`,
    data: {review_id: req.query.review_id},
    headers: {
      Authorization: process.env.API_TOKEN
    }

  })
    .then(function (response) {
    //looking for 204 to get update
    console.log('report api response--> ', response.status);
    res.sendStatus(response.status);
  })
    .catch(function (err) {
    // console.log('api request error--> ', err);
    res.sendStatus(err.response.status)
  })
})

/*
  ----------------------------
  | End of Review Routes |
  ----------------------------
/*
 *  ---------------------------
 *  | Product Overview Routes |
 *  ---------------------------
*/

app.get('/product', (req, res) => {
  let id = req.query.id;
  // console.log()
  axios({
    method: 'get',
    url: `${API_URL}/products/${id}`,
    headers: {
      Authorization: process.env.API_TOKEN
    }
  }).then(function (response) {
    dataStr = JSON.stringify(response.data);
    res.send(dataStr);
    res.end();
  }).catch(function (error) {
    console.log('/products api request error: ', error);
  })
});

app.get('/styles', (req, res) => {
  let id = req.query.id;
  // console.log()
  axios({
    method: 'get',
    url: `${API_URL}/products/${id}/styles`,
    headers: {
      Authorization: process.env.API_TOKEN
    }
  }).then(function (response) {
    dataStr = JSON.stringify(response.data);
    res.send(dataStr);
    res.end();
  }).catch(function (error) {
    console.log('/styles api request error: ', error);
  })
})

/*
  ----------------------------
  | RelatedProducts Routes |
  ----------------------------
*/
let retrieveRelatedProductStyles = (relatedProductIds) => {
  let stylesPromises = [];
  for (var i = 0; i < relatedProductIds.length; i++) {
    let currentProduct = relatedProductIds[i];
    let APIStylesRequest = axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${currentProduct}/styles`, {
      headers: {
        'Authorization': process.env.API_TOKEN,
        'product_id': currentProduct
      }
    });
    stylesPromises.push(APIStylesRequest);
  }
  let stylesInfo = Promise.all(stylesPromises);
  return stylesInfo;

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
  let productInfo = Promise.all(promisesArray);
  return productInfo;

}

//get related product ids and related product info
app.get('/relatedProducts', (req, res) => {
  let parentProductId = Number(req.query.defaultProductId);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${parentProductId}/related`, {
    headers: {
      'Authorization': process.env.API_TOKEN,
      'product_id': parentProductId
    }
  })
    .then((relatedProducts) => {
      return retrieveRelatedProducts(relatedProducts.data)
    })
    .then((arrayOfResponses) => {
      let data = arrayOfResponses.map(res => {
        return res.data
      })
      res.json(data);
    })
    .catch((error) => {
      // console.log('error getting related products array on server from API: ', error);
      res.sendStatus(500);
    })
});


//get related product styles and images
app.get('/relatedProductStyles', (req, res) => {
  let parentProductId = Number(req.query.defaultProductId);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${parentProductId}/related`, {
    headers: {
      'Authorization': process.env.API_TOKEN,
      'product_id': parentProductId
    }
  })
    .then((relatedProducts) => {
      return retrieveRelatedProductStyles(relatedProducts.data)
    })
    .then((arrayOfStyleResponses) => {
      let styleData = arrayOfStyleResponses.map(res => {
        return res.data
      })
      res.json(styleData);
    })
    .catch((error) => {
      console.log('error getting styles info on server from API: ', error);
      res.sendStatus(500);
    })
})
//----------------------------------------------------- END RELATED PRODUCTS--------------------------------------


//CS- Questions & Answer START------------------------------------------------------------
app.get('/api/qa/id=*', (req, res) => {
  console.log('QA**request-->', req.query.product_id) ;
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
        // console.log('api response: ', response.data);

        res.status(200).send(response.data.results);
      }).catch(function (err) {
        console.log('api request error: ', err);
        res.status(500).send(err);
      })

});
app.post('/addAnswer', (req, res)=> {
  // console.log('QA**request AddAnswer-->', req.body.question_id, req.body) ;
  axios({
    method: 'POST',
    url: `${API_URL}/qa/questions/${req.body.question_id}/answers`,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    data: {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos
    }
  }).then(function (response) {
    // console.log('SUCCESS___>>>api response: ', response.data);

    res.status(200).send(response.data);
  }).catch(function (err) {
    console.log('api request error: ', err);
    res.status(500).send(err);
  })

})
app.post('/addQuestion', (req, res)=> {
  console.log('QA**request AddAQuestion-->',req.body) ;
  axios({
    method: 'POST',
    url: `${API_URL}/qa/questions/`,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    data: {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: req.body.product_id
    }
  }).then(function (response) {
    console.log('SUCCESS___>>>api response: ', response.data);

    res.status(200).send(response.data);
  }).catch(function (err) {
    console.log('api request error: ', err);
    res.status(500).send(err);
  })

})
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
    // console.log('api response--> ', response.status);
    res.sendStatus(response.status);
  })
    .catch(function (err) {
    console.log('UPDATE ERROR ', err);
    res.status(404).send(err);
  })

})

app.put('/report', (req, res) => {
  console.log('request-->', req.body.data)
  const {questionid} = req.body.data;
  const {answerid} = req.body.data;
  let urlPut, report_id ;
  if(questionid){
    urlPut = `${API_URL}/qa/questions/${questionid}/report`;
    report_id = {question_id : questionid};
  } else {
    urlPut = `${API_URL}/qa/answers/${answerid}/report`;
    report_id = {answer_id : answerid}
  }
  // console.log('request-->',question_id)
  axios({
    method: 'put',
    url: urlPut,
    data: report_id,
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

})

//CS- Question & Answer END----------------------------------------------------------------------



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





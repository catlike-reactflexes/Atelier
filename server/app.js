
require('dotenv').config();
//process.env.API_TOKEN
const compression = require('compression');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const $ = require('jquery');

const bodyParser = require('body-parser');
const fs = require('fs');


const reviewURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';
const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const QnA_URL = 'http://127.0.0.1:4000';

//app.use(express.static(path.resolve(__dirname, '../client/dist')));
//this is a regex expression that will allow the app to serve the static files
//dynamically with our default product id and a real url
app.use(compression());
app.use('/:id(\\d{5})', express.static('client/dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {

  // res.sendFile('index.html');
});
/*
  ---------------------------
  | Atelier Interactions API
  ---------------------------
  //make a post to API
*/

app.post('/api/interactions', (req, res) => {
  // console.log('Interaction API-->', req.body);
  axios({
    method: 'POST',
    url: `${API_URL}/interactions`,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    data: {
      element: req.body.element,
      widget: req.body.widget,
      time: req.body.time
    }
  }).then(function (response) {
    // console.log('SUCCESS(201)**Interaction API-->', response.status, response.statusText);
    res.status(response.status).send(response.data);
  }).catch(function (err) {
    console.log('api request error: ', err);
    res.status(response.status).send(err);
  })

})
/*
  ----------------------------
  | Review Routes |
  ----------------------------
*/

app.post('/reviews', (req, res) => {
  let newReview = {
    product_id: Number(req.body.product_id),
    rating: Number(req.body.rating),
    summary: req.body.summary,
    body: req.body.reviewBody,
    recommend: true,
    characteristics: {'159186': 5,'159187': 5, '159184': 5, '159185': 5},
    name: req.body.reviewerName,
    email: req.body.reviewerEmail,
    photos: []
  }
  // let config = {
  //   headers: {'Authorization': process.env.API_TOKEN},
  //   params:
  // }
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', newReview, {
    headers: {Authorization: process.env.API_TOKEN}
  })
  .then((response) => {
    console.log('successful post')
    res.send(response.status)
  })
  .catch((error) => {
    console.log('post error in server: ', error)
    res.send(error.response.status)
  })
})

app.get('/reviews', (req, res) => {
  // console.log('reviews api token: ', process.env.API_TOKEN)
  let product_id = Number(req.query.productID)
  let config = {
    headers: {'Authorization': process.env.API_TOKEN},
    params: {
      'product_id': product_id,
      'count': req.query.count,
      'sort': req.query.sort
  }
  }

  // console.log(typeof product_id)
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', config)
    .then(data => {
      // console.log('api response: ', data.data.results);
      return res.json(data.data)
    })
    .catch(err => {
      console.log('review get error: ', err.response.status)
      res.send(err.response.status)
      // throw err
    })
})

app.get('/reviewratings', (req, res) => {
  // console.log('reviews api token: ', process.env.API_TOKEN)
  let product_id = Number(req.query.productID)
  let config = {
    headers: { 'Authorization': process.env.API_TOKEN },
    params: { 'product_id': product_id, 'count': Number(req.query.count) }
  }

  // console.log(typeof product_id)
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', config)
    .then(data => {
      // console.log('api response: ', data.data.results);
      return res.json(data.data)
    })
    .catch(err => {
      console.log('reviewratings get error: ', err.response.status)
      res.send(err.response.status)
    })
})

app.get('/reviewmeta', (req, res) => {
  let product_id = Number(req.query.productID)
  let config = {
    headers: { 'Authorization': process.env.API_TOKEN },
    params: { 'product_id': product_id }
  }
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta', config)
  .then(metadata => {
    // console.log('meta api response: ', metadata.data);
    res.json(metadata.data)
  })
  .catch(err => {
    console.log('reviewmeta get error: ', err.response.status)
    res.send(err.response.status)
  })
})

app.get('/reviewhelpful', (req, res) => {
  let config = {
    headers: { 'Authorization': process.env.API_TOKEN }
  }
  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/helpful`,
    data: { review_id: req.query.review_id },
    headers: {
      Authorization: process.env.API_TOKEN
    }

  })
    .then(response => {
      console.log('helpful api response ', response.status)
      res.send(response.status)
    })
    .catch(err => {
      res.sendStatus(404)
      // console.log('helpful review put error: ', err)
    })
})

app.get('/reviewreport', (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/report`
  console.log('report url, ', url)

  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.query.review_id}/report`,
    data: { review_id: req.query.review_id },
    headers: {
      Authorization: process.env.API_TOKEN
    }

  })
    .then(function (response) {
      //looking for 204 to get update
      console.log('report api response--> ', response.status);
      res.send(response.status);
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
  // console.log('/product route req.query: ', req.query)
  let id = req.query.id;
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

/* exploring products

app.get('/product-list', (req, res) => {
  let idList = [];
  axios({
    method: 'get',
    url: `${API_URL}/products/`,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    params: {
      count: 500
    }
  }).then(function (response) {
    data = response.data;
    data.forEach(obj => idList.push(obj.id));
    console.log('idlist: ', idList);
    fs.writeFile(__dirname + 'idlist.txt', JSON.stringify(idList), (err) => {
      if (err) {
        console.log('error writing file: ', err);
        return;
      }
    })
  }).catch(function (error) {
    console.log('/styles api request error: ', error);
  })
})
*/

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


app.get('/yourOutfitProductData', (req, res) => {
  let yourOutfitIds = JSON.parse(req.query.yourOutfitIds);
  let arrayOfOutfitPromises = [];
  for (var i = 0; i < yourOutfitIds.length; i++) {
    let id = yourOutfitIds[i];
    arrayOfOutfitPromises.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
      headers: {
        'Authorization': process.env.API_TOKEN,
        'product_id': id
      }
    }))

  }
  Promise.all(arrayOfOutfitPromises)
    .then((outfitProductData) => {
      //console.log('success getting outfit product data: ', outfitProductData);
      let outfitData = outfitProductData.map(response => {
        return response.data;
      })
      res.send(outfitData);
    })
    .catch((error) => {
      console.log('error getting outfit product data: ');
    })
})

app.get('/yourOutfitStyles', (req, res) => {
  let yourOutfitIds = JSON.parse(req.query.yourOutfitIds);
  let arrayOfStylePromises = [];
  for (var i = 0; i < yourOutfitIds.length; i++) {
    let id = yourOutfitIds[i];
    arrayOfStylePromises.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, {
      headers: {
        'Authorization': process.env.API_TOKEN,
        'product_id': id
      }
    }))
  }
  Promise.all(arrayOfStylePromises)
    .then((outfitStyles) => {
      //console.log('success getting outfit style data: ', outfitStyles);
      let outfitStyleData = outfitStyles.map(response => {
        return response.data;
      })
      res.send(outfitStyleData);
    })
    .catch((error) => {
      console.log('error getting outfit style data: ');
    })
})
//----------------------------------------------------- END RELATED PRODUCTS--------------------------------------


//CS- Questions & Answer START------------------------------------------------------------
// const fileUpload = require('express-fileupload');



app.get('/api/qa/id=*', (req, res) => {
  // console.log('QA**request-->', req.query.product_id) ;
  // console.log('request-->', req.path) ;
  const { product_id } = req.query;

  axios({
    method: 'get',
    url: `${QnA_URL}/qa/questions/${product_id}`,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    params: {
      // product_id: req.query.product_id,
      // count: 10
    }
  }).then(function (response) {
    // console.log('api response: ', response.data);
    res.status(200).send(response.data.results);
  }).catch(function (err) {
    console.log('api request error: ', err);
    res.status(500).send(err);
  })

});

//S3, Multer
const multer = require('multer');
const { uploadFile } = require('./Questions/s3');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/Questions/image_uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage })

app.post('/api/addAnswer', upload.array('images'), (req, res) => {
  console.log('QA**request AddAnswer-->', req.body);


  let photoUrl = [];
  const files = req.files;

  const postAnswer = (question_id, body, name, photoUrl) => {

    console.log('Inside postAnswer Axio--->');
    console.log('ready to post---', photoUrl)
    axios({
      method: 'POST',
      url: `${QnA_URL}/qa/questions/${question_id}/answers`,
      headers: {
        Authorization: process.env.API_TOKEN
      },
      data: {
        body: body,
        name: name,
        email: 'testing@gmail.com',
        photos: photoUrl
      }
    }).then(function (response) {
      console.log('SUCCESS___>>>api response: ', response.data, 'Status:', response.status);
      // res.status(response.status).send(response.data);
      res.status(204).send('Success');
    }).catch(function (err) {
      console.log('Why error????')
      console.log('api request error: ', err.data, err.status);
      res.status(err.status).send(err.data);
    })
  }

  const uploadImages = async (cb) => {
    let imagesUrl = [];
    let promises = files.map(async file => {
      const ans = await uploadFile(file)
      imagesUrl.push(ans.Location);
      console.log('Answer-3->', ans)
    })
    result = await Promise.all(promises);
    console.log('Test-1->', result)
    console.log('Test-2->', imagesUrl)
    cb(null, imagesUrl);
  }
  //if there is no images, then POST
  if (files.length === 0) {
    postAnswer(req.body.question_id, req.body.body, req.body.name, photoUrl);
  } else {
    //upload to S3
    uploadImages((err, imageData) => {
      //once we have URL, then POST
      if (imageData) {
        console.log('ready to post---', imageData)
        postAnswer(req.body.question_id, req.body.body, req.body.name, imageData);
      }
    });
  }

})

app.post('/api/addQuestion', (req, res) => {
  console.log('QA**request AddAQuestion-->', req.body);

  axios({
    method: 'POST',
    url: `${QnA_URL}/qa/questions/`,
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
    // console.log('api request error: ', err);
    res.status(500).send(err);
  })

})
app.put('/api/update', (req, res) => {
  // console.log('request-->', req.body.data)
  const { questionid } = req.body.data;
  const { answerid } = req.body.data;
  let urlPut, idHelpfulness;
  if (questionid) {
    urlPut = `${QnA_URL}/qa/questions/${questionid}/helpful`;
    idHelpfulness = { question_id: questionid };
  } else {
    urlPut = `${QnA_URL}/qa/answers/${answerid}/helpful`;
    idHelpfulness = { answer_id: answerid }
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
      // console.log('UPDATE ERROR ', err);
      res.status(404).send(err);
    })

})

app.put('/api/report', (req, res) => {
  console.log('request-->', req.body.data)
  const { questionid } = req.body.data;
  const { answerid } = req.body.data;
  let urlPut, report_id;
  if (questionid) {
    urlPut = `${QnA_URL}/qa/questions/${questionid}/report`;
    report_id = { question_id: questionid };
  } else {
    urlPut = `${QnA_URL}/qa/answers/${answerid}/report`;
    report_id = { answer_id: answerid }
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
      // console.log('api response--> ', response);
      res.sendStatus(response.status);
    })
    .catch(function (err) {
      // console.log('api request error--> ', err);
      res.status(404).send(err);
    })

})

//CS- Question & Answer END----------------------------------------------------------------------



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});





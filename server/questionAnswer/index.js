const axios = require ('axios');
// const Github_Token = require ('./config');
// console.log('Github-->', Github_Token);

const configHeader = {headers: {"Authorization": process.env.API_TOKEN}};

const getQuesAns = (productId, callback) => {
  const urlGet = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${productId}`

  axios.get(urlGet,configHeader)
    .then(response => {
      console.log('Axios success',response.data.results);
      callback(null, response.data.results);
    })
    .catch(error => {
      console.log('Axios failed',error);
      callback(error, null);
    })

}
//'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products';
//
// // const urlGet = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/396941/answers';
// //test



//   axios.get(urlGet,configHeader)
//   .then(response => {
//     console.log('Axios success',response.data);
//     // callback(null, response.data);
//   })
//   .catch(error => {
//     console.log('Axios failed',error);
//     // callback(error, null);
//   })

//POST Request (Working code)
//  const urlPost = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/396941/answers';
//  const dataPost = {
//    body: "Is it organic?",
//    name: "JasPot",
//    email: "jsxpot@tulip.com",
//    photos:[]
//  }
//  axios.post(urlPost, dataPost,{headers:{"Authorization": Github_Token }})
//   .then(response => {
//     console.log('Axios success',response.status, response.statusText,response.data);
//     // callback(null, response.data);
//   })
//   .catch(error => {
//     console.log('Axios failed',error);
//     // callback(error, null);
//   })

// PUT Request (Working code)
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


/*
* Working string query
* Answers List-working
* when you see <:> you can juust type in the value
*  https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/47425
*  https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/396941/answers
*  {
  question: '396941',
  page: 1,
  count: 5,
  results: [
    {
      answer_id: 3715584,
      body: 'Canada',
      date: '2018-08-06T00:00:00.000Z',
      answerer_name: 'footballfan',
      helpfulness: 9,
      photos: []
    }
  ]
}
*  https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=47425
* Axios success {
  product_id: '47425',
  results: [
    {
      question_id: 396943,
      question_body: 'Why is this product cheaper here than other sites?',
      question_date: '2018-10-18T00:00:00.000Z',
      asker_name: 'willsmith',
      question_helpfulness: 4,
      reported: false,
      answers: [Object]
    },
    {
      question_id: 396944,
      question_body: 'How long does it last?',
      question_date: '2019-06-28T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 2,
      reported: false,
      answers: [Object]
    },
    {
      question_id: 396942,
      question_body: 'What fabric is the top made of?',
      question_date: '2018-06-17T00:00:00.000Z',
      asker_name: 'funnygirl',
      question_helpfulness: 1,
      reported: false,
      answers: [Object]
    },
    {
      question_id: 396940,
      question_body: 'Can I wash it?',
      question_date: '2017-01-04T00:00:00.000Z',
      asker_name: 'luaulover',
      question_helpfulness: 1,
      reported: false,
      answers: [Object]
    },
    {
      question_id: 396941,
      question_body: 'Where is this product made?',
      question_date: '2018-07-06T00:00:00.000Z',
      asker_name: 'bballfan',
      question_helpfulness: 0,
      reported: false,
      answers: [Object]
    }
  ]
}
*
*/
//

// let getQa = (choice, callback) => {
//   console.log(`Getting ${choice}`)
//   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/product_id=5`)
//   .then(response => {
//     console.log('Axios success',response.data);
//     callback(null, response.data);
//   })
//   .catch(error => {
//     console.log('Axios failed',error);
//     callback(error, null);
//   })
// }


module.exports={
  getQuesAns
};
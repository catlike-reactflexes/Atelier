const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const QuestionAnswer_API = require('./questionAnswer');

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

//CS- Questions & Answer START
app.get('/api/qa', (req, res) => {
  QuestionAnswer_API.getQuesAns(47421,(err, data)=> {
    if(err){
      res.status(400).send(err);
    }else {
      console.log('Before send', data)
      res.send(data);
    }
  })
});
//CS- Question & Answer END

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

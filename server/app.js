require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/product', (req, res) => {
  let data = req.body;
  console.log('req.body: ', req.body);
  console.log('req.data: ', req.data);
  console.log('req.query.id: ', req.query.id);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

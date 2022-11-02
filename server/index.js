const express = require('express');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const app = express();

// 設置跨域請求
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-methods', 'POST,GET');
  next();
});

// get images
app.get('/images/:filename', (req, res) => {
  res.sendFile(resolve(__dirname, './images/' + req.params.filename));
});

// get image description
app.get('/imgs', (req, res) => {
  const imageData = JSON.parse(readFileSync(resolve(__dirname, './data/images.json'), 'utf8'));
  res.send(imageData);
})

app.listen(3000, () => {
  console.log(123);
})
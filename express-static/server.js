
var express = require('express');

var app = express();

var path = require('path');

var tt = require('./public/js/index.js');

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send("aaa");
});

app.listen(3000, (req, res) => {
  console.log('app is running at port 3000');
});
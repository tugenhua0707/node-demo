
const express = require('express');

const cookieParase = require('cookie-parser');

const fs = require('fs');

const app = express();

app.use(cookieParase());

app.get('/cookie.html', function(req, res) {
  res.sendfile(__dirname + '/cookie.html');
});

app.post('/cookie.html', function(req, res) {
  for (const key in req.cookies) {
    res.write('cookie名：' +key);
    res.write(',cookie值为:'+req.cookies[key] + "<br/>");
  }
  res.end();
});

const port = process.env.port || 3002;
app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});

const express = require('express');
const fs = require('fs');
const app = express();
const cookieParase = require('cookie-parser');
const sessionParser = require('express-session');

app.use(cookieParase());
app.use(sessionParser({secret: 'test', cookie: {maxAge: 3600000}}));

app.get('/session.html', function(req, res) {
  res.sendfile(__dirname+'/session.html');
  var h = 3600000;
  req.session.cookie.expires = new Date(Date.now() + h);
  req.session.cookie.maxAge = h;
  setTimeout(function() {
    console.log('cookie的剩余时间'+req.session.cookie.maxAge);
  }, 5000);
});

const port = process.env.port || 3003;
app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});
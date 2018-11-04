//引入cookieparser 框架，读取客户端发送的cookie
const express = require('express');

const cookieParase = require('cookie-parser');

var app = express();

//如果没有，下面的req.cookies 会返回undefined
app.use(cookieParase());

app.use('/', function (req,res) {
    res.cookie('user', 'kongzhi');
    console.log(req.cookies);
    res.send('cookie我来了');
});
const port = process.env.port || 3001;
app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});
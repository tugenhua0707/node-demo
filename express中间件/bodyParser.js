
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// 对不同的路由使用不同的内容类型来解析

// 创建 application/json 解析
const jsonParser = bodyParser.json();

// 创建 application/x-www-form-urlencoded解析
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// post /a 获取URL编码的请求体
app.post('/a', urlencodedParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  console.log(req.body);
  res.send('welcome,' + req.body.userName);
  res.end();
});

// post /b 获取URL编码的请求体
app.post('/b', jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  res.send('welcome,' + req.body.userName);
  res.end();
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});

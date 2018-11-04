
const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));


// 使用中间件，'combined' 是日志显示的格式，具体看github上(https://github.com/expressjs/morgan/#predefined-formats)
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/morgan.html', (req, res) => {
  res.sendFile(__dirname + '/morgan.html');
});

// post 请求监听 
app.post('/morgan.html', (req, res) => {
  req.on('data', (data) => {
    console.log(data.toString());
    res.end();
  });
});

const port = process.env.port || 3005;
app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});
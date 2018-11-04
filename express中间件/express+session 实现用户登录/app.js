

const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs').__express;

app.set('views', __dirname); // 设置模板目录
app.set('view engine', 'html'); // 设置模板引擎为 html
app.engine('html', ejs); // 使用ejs模板引擎解析html文件中ejs语法

app.use(bodyParser.json()); // 使用 body-parser中间件 json形式

// 解析UTF-8编码的数据，返回一个处理urlencoded数据的中间件
app.use(bodyParser.urlencoded({ extended: true })); 

// 使用session中间件 设置cookie相关的信息

app.use(session({
  secret: 'test', // 对 session id 相关的cookie 进行加密签名
  cookie: {
    maxAge: 1000 * 60 * 1  // 设置 session的有效时间，单位为毫秒，设置有效期为1分钟
  }
}));

// get 登录页面
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// 监听post表单事件 用户登录
app.post('/login', (req, res) => {
  // 这里没有连接数据库，所以用户名和密码假如是写死的，所以简单进行判断一下
  if (req.body.username === 'kongzhi' && req.body.password === '123456') {
    req.session.username = req.body.username; // 登录成功，把登录信息保存到session里面去了
    // 登录成功后，进行重定向到首页
    res.redirect('/');
  } else {
    // 用户名或密码登录错误
    res.json({
      'code': 1,
      'errorMsg': '账户或密码错误'
    });
  }
});

// 处理重定向首页的逻辑代码
app.get('/', (req, res) => {
  // 如果session有已经登录的用户名的话，且有效期有效的话，则到 home.html， 否则重定向到登录页面
  if (req.session.username) {
    res.render('home', {username: req.session.username});
  } else {
    res.redirect('login');
  }
});

// 处理退出的逻辑
app.get('/logout', (req, res) => {
  req.session.username = null; // 删除session
  // 重定向到登录页面
  res.redirect('login');
});

const port = process.env.port || 3004;
app.listen(port, () => {
  console.log('http://127.0.0.1:%s', port)
});




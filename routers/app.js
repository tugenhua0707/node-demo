
const Koa = require('koa');
const app = new Koa();

const router = require('./routes/index');

// 加载路由中间件
app.use(router.routes(), router.allowedMethods());

app.listen(3001, () => {  
  console.log('server is running at http://localhost:3001');
});

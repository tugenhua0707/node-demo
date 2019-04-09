
const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = 'hello world';
});

router.get('/home', (ctx, next) => {
  ctx.body = '欢迎光临home页面';
});

module.exports = router;
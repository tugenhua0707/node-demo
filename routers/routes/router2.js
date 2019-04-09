
const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = '已经进入router2页面了';
});

router.get('/detail', (ctx, next) => {
  ctx.body = '已经进入详情页面了';
});

module.exports = router;
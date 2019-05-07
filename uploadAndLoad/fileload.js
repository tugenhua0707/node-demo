
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const koaBody = require('koa-body');
const static = require('koa-static');
const send = require('koa-send');
const app = new Koa();
app.use(koaBody());

router.get('/', (ctx) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'html';
  // 读取文件
  const pathUrl = path.join(__dirname, '/static/load.html');
  ctx.body = fs.createReadStream(pathUrl);
});

router.get('/fileload/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `static/upload/${name}`;
  ctx.attachment(path);
  await send(ctx, path);
});

app.use(static(path.join(__dirname)));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001, () => {
  console.log('server is listen in 3001');
});
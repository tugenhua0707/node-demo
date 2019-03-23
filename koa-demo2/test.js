/*
const testKoa = require('./application');
const app = new testKoa();

const obj = {};

app.use(async (ctx, next) => {
  obj.name = 'kongzhi';
  console.log(1111);
  await next();
  console.log('aaaaa');
});

app.use(async (ctx, next) => {
  obj.age = 30;
  console.log(2222);
  await next();
  console.log('bbbbb')
});

app.use(async (ctx, next) => {
  console.log(3333);
  console.log(obj);
});
app.listen(3001, () => {
  console.log('listening on 3001');
});
*/
/*
app.use((req, res) => {
  res.writeHead(200);
  res.end('hello world....');
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
*/
/*
app.use(async ctx => {
  console.log(ctx.status); // 打印状态码为200
  ctx.body = 'hello world';
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
*/
/*
// 假如下面是三个测试函数，想要实现 koa中的中间件机制
async function fun1(next) {
  console.log(1111);
  await next();
  console.log('aaaaaa');
}

async function fun2(next) {
  console.log(22222);
  await next();
  console.log('bbbbb');
}

async function fun3() {
  console.log(3333);
}
let next1 = async function () {
  await fun2(next2);
}
let next2 = async function() {
  await fun3();
}
fun1(next1);
*/
/*
async function fun1(next) {
  console.log(1111);
  await next();
  console.log('aaaaaa');
}

async function fun2(next) {
  console.log(22222);
  await next();
  console.log('bbbbb');
}

async function fun3() {
  console.log(3333);
}

function compose(middleware, oldNext) {
  return async function() {
    await middleware(oldNext);
  }
}

const middlewares = [fun1, fun2, fun3];

// 最后一个中间件返回一个promise对象
let next = async function() {
  return Promise.resolve();
};

for (let i = middlewares.length - 1; i >= 0; i--) {
  next = compose(middlewares[i], next);
}
next();
*/
/*
async function fun1(next) {
  console.log(1111);
  await next();
  console.log('aaaaaa');
}

async function fun2(next) {
  console.log(22222);
  await next();
  console.log('bbbbb');
}

async function fun3() {
  console.log(3333);
}

const next = async function(){
  await fun1(async function() {
    await fun2(async function() {
      await fun3(async function(){
        return Promise.resolve();
      });
    });
  });
};

next();
*/
/*
const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  str += 'hello world'; // 没有声明该变量, 所以直接拼接字符串会报错
  ctx.body = str;
});

app.on('error', (err, ctx) => { // 捕获异常记录错误日志
  console.log(err);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
*/

const testKoa = require('./application');
const app = new testKoa();

app.use((ctx) => {
  str += 'hello world'; // 没有声明该变量, 所以直接拼接字符串会报错
  ctx.body = str;
});

app.on('error', (err, ctx) => { // 捕获异常记录错误日志
  console.log(err);
});

app.listen(3000, () => {
  console.log('listening on 3000');
});




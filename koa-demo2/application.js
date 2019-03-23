
const Emitter = require('events');
const http = require('http');

// 引入 context request, response 模块
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application extends Emitter {
  /* 构造函数 */
  constructor() {
    super();
    // this.callbackFunc = null;
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    // 保存所有的中间件函数
    this.middlewares = [];
  }
  // 开启 http server 并且传入参数 callback
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  use(fn) {
    // this.callbackFunc = fn;
    // 把所有的中间件函数存放到数组里面去
    this.middlewares.push(fn);
    return this;
  }
  callback() {
    return (req, res) => {
      /*
      // 创建ctx
      const ctx = this.createContext(req, res);
      // 响应内容
      const response = () => this.responseBody(ctx);
      this.callbackFunc(ctx).then(response);
      */
      // 创建ctx
      const ctx = this.createContext(req, res);
      // 响应内容
      const response = () => this.responseBody(ctx);

      // 响应时 调用error函数
      const onerror = (err) => this.onerror(err, ctx);

      //调用 compose 函数，把所有的函数合并
      const fn = this.compose();
      return fn(ctx).then(response).catch(onerror);
    }
  }
  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    if (!(err instanceof Error)) throw new TypeError(util.format('non-error thrown: %j', err));

    if (404 == err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();
  }
  /*
   构造ctx
   @param {Object} req实列
   @param {Object} res 实列
   @return {Object} ctx实列
  */
  createContext(req, res) {
    // 每个实列都要创建一个ctx对象
    const ctx = Object.create(this.context);
    // 把request和response对象挂载到ctx上去
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  /*
   响应消息
   @param {Object} ctx 实列
  */
  responseBody(ctx) {
    const content = ctx.body;
    if (typeof content === 'string') {
      ctx.res.end(content);
    } else if (typeof content === 'object') {
      ctx.res.end(JSON.stringify(content));
    }
  }
  /*
   把传进来的所有的中间件函数合并为一个中间件
   @return {function}
  */
  compose() {
    // 该函数接收一个参数 ctx
    return async ctx => {
      function nextCompose(middleware, oldNext) {
        return async function() {
          await middleware(ctx, oldNext);
        }
      }
      // 获取中间件的长度
      let len = this.middlewares.length;
      // 最后一个中间件返回一个promise对象
      let next = async function() {
        return Promise.resolve();
      };
      for (let i = len; i >= 0; i--) {
        next = nextCompose(this.middlewares[i], next);
      }
      await next();
    };
  }
}

module.exports = Application;
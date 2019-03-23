
const delegates = require('./delegates');

const context = {
  // ..... 其他很多代码
};
// 代理request对象
delegates(context, 'request').access('url');

// 代理response对象
delegates(context, 'response').access('body').access('status');

/*
const context = {
  get url() {
    return this.request.url;
  },
  set url(val) {
    this.request.url = val;
  },
  get body() {
    return this.response.body;
  },
  set body(data) {
    this.response.body = data;
  },
  get status() {
    return this.response.statusCode;
  },
  set status(statusCode) {
    if (typeof statusCode !== 'number') {
      throw new Error('statusCode 必须为一个数字');
    }
    this.response.statusCode = statusCode;
  }
};
*/
module.exports = context;
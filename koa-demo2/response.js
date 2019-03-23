
const response = {
  get body() {
    return this._body;
  },
  set body(data) {
    this._body = data;
  },
  get status() {
    return this.res.statusCode;
  },
  set status(statusCode) {
    if (typeof statusCode !== 'number') {
      throw new Error('statusCode 必须为一个数字');
    }
    this.res.statusCode = statusCode;
  }
};

module.exports = response;
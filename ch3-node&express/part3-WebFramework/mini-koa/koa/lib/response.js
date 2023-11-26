const response = {
  set status(code) {
    this.res.statusCode = code;
  },

  _body: "", // 真正用来存数据的

  get body() {
    return this._body;
  },

  set body(value) {
    this._body = value;
  },
};

module.exports = response;

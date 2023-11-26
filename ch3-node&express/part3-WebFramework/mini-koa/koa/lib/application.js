const http = require("http");
class Applcation {
  constructor() {
    this.middleware = []; // 保存用户添加的中间件函数
  }
  listen(...args) {
    const server = http.createServer((req, res) => {
      res.end("My Koa");
    });

    server.listen(...args);
  }

  use(fn) {
    this.middleware.push(fn);
  }
}

module.exports = Applcation;

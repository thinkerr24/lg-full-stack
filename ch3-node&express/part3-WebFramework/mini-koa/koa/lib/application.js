const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Applcation {
  constructor() {
    this.middleware = []; // 保存用户添加的中间件函数

    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  listen(...args) {
    const server = http.createServer(this.callback());

    server.listen(...args);
  }

  use(fn) {
    this.middleware.push(fn);
  }

  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function (context) {
      const dispatch = (index) => {
        if (index >= middleware.length) {
          return Promise.resolve();
        }
        const fn = middleware[index];
        return Promise.resolve(
          // TODO: 上下文对象/ next
          fn(context, () => dispatch(index + 1))
        );
      };
      // 返回第一个中间件处理函数
      return dispatch(0);
    };
  }

  // 构造上下文对象
  createContext() {}

  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      // 每个请求都会创建一个独立的Context上下文对象，它们之间不会互相污染
      const newContext = this.createContext();
      fnMiddleware(newContext)
        .then(() => {
          console.log("end");
          res.end("My Koa");
        })
        .catch((err) => {
          res.end("error message");
        });
    };
    return handleRequest;
  }
}

module.exports = Applcation;

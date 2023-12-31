const http = require("http");
const { Stream } = require("stream");
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
  createContext(req, res) {
    // 一个实例会处理多个请求，而不同请求应拥有不同的上下文对象，为了避免请求期间的数据交叉污染，这里又对数据做了一份拷贝
    const context = Object.create(this.context);
    const request = (context.request = Object.create(this.request));
    const response = (context.response = Object.create(this.response));

    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }

  callback() {
    const fnMiddleware = this.compose(this.middleware);
    const handleRequest = (req, res) => {
      // 每个请求都会创建一个独立的Context上下文对象，它们之间不会互相污染
      const newContext = this.createContext(req, res);
      fnMiddleware(newContext)
        .then(() => {
          // res.end("My Koa");
          // res.end(newContext.body);
          respond(newContext);
        })
        .catch((err) => {
          console.log("err:", err);
          res.end("error message");
        });
    };
    return handleRequest;
  }
}

function respond(ctx) {
  const { body, res } = ctx;
  if (body === null) {
    res.statusCode = 204;
    res.end();
  }
  if (typeof body === "string") return res.end(body);
  if (Buffer.isBuffer(body)) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);
  if (typeof body === "number") return res.end(body + "");
  if (typeof body === "object") {
    const jsonStr = JSON.stringify(body);
    res.end(jsonStr);
  }
}

module.exports = Applcation;

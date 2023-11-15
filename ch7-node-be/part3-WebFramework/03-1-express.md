# Express

### What is Express?

Express 是一个快速，极简的 NodeJS web 应用开发框架，通过它，可以轻松地构建各种 web 应用，比如 接口服务，传统 web 网站，开发工具集成等等

Express 本身是极简的，仅仅提供了 web 开发的基础功能，但是它通过中间件的方式集成了许许多多的外部插件来处理 HTTP 请求:

1.body-parse: 解析 HTT 请求体 <br />
2.compression: 压缩 HTTP 请求 <br />
3.cookie-parser: 解析 cookie 数据 <br />
4.cors: 处理跨域资源请求 <br />
5.morgan: HTTP 请求日志记录 <br />
...

Express 中间件的特性固然强大，但是它提供的灵活性是一把双刃剑。它让 Express 本身变得更加灵活和简单，缺点在于虽然有一些中间件包可以解决几乎所有问题或需求，但是挑选合适的包有时也会成为一个挑战

Express 不对 Node.js 已有的特性进行二次抽象，只是在它之上又拓展了 web 应用所需要的基本功能

内部使用的还是 http 模块，请求对象继承自 http.IncomingMessage，响应对象继承自 http.ServerResponse

由很多流行框架基于 Express LoopBack, Sails, NestJS:一个渐进式的 Node.js 框架，用于在 Typescript 和 Javascript(ES6, ES7, ES8)之上构建高效可扩展的企业级服务器端应用程序

### Express 特性

简单易学 <br />
丰富的基础 API 支持，以及常用的 HTTP 辅助程序如重定向缓存等 <br />
强大的路由功能 <br />
灵活的中间件 <br />
高性能 <br />
非常稳定(源代码几乎 100%测试覆盖率) <br />
视图系统支持 14 个以上的主流模板引擎 <br />

#### Express 发展历史

### Express 应用场景

1.传统 Web 网站(ghost.org) <br /> 2.接口服务 <br /> 3.服务端渲染中间层 <br /> 4.开发工具(JSON Server, webpack-dev-server)

## Express 基本使用

### Hello, World

mkdir myapp <br />
npm init -y <br />
npm i express <br />
app.js: <br/>
`const express = require("express");
const app = express();
const port = 3001;
// for post req.body(undefined) parse
app.use(express.json());
app.get("/", (req, res) => {
res.send("<h1>Hello</h1>");
});
app.get("/hello", (req, res) => {
res.json({
msg: "hello Json",
});
});
app.listen(port, () => {
console.log("server running at port 3001");
});`

### 路由基础

路由指确定应用程序如何响应客户端对特定端点的请求，该特定端点是 URI(或路径)+特定的 HTTP 请求方法(GET, POST,PUT, DELETE 等) <br />
每个路由可以具有一个或多个处理程序函数，这些函数在匹配该路由时执行。路由定义采用以下结构:<br/>`app.METHOD(PATH, HANDLER)` <br/>
app 是 Express 实例;METHOD 是小写的 HTTP 请求方法;PATH 是服务器上的路径;HANDLER 是当路由匹配时执行的功能

## 请求与响应

Express 应用使用路由回调函数的参数:request 和 response 对象来处理请求和响应的数据，对象名简写为 req 和 res
`app.get('/', function(request, response) {
    // TO DO
});
`
Express 不对 Node.js 已有的特性进行二次抽象，只是在它之上扩展了 web 应用所需的基本功能 <br/>

1.内部使用的还是 http 模块 <br/> 2.请求对象继承自 http.IncomingMessage <br/>3.响应对象继承自:http.ServerResponse <br/>
Express 拓展了 HTTP 模块中的请求和响应对象

### 请求对象

req 对象代表 HTTP 请求，并具有请求查询字符串，参数，正文，HTTP 标头等属性 <br/>
console.log(req.url); // 地址 / <br/>
console.log(req.method); // 方法 GET <br/>
console.log(req.headers); // 请求头
{
'content-type': 'application/json',
'user-agent': 'PostmanRuntime/7.28.4',
accept: '_/_',
'postman-token': '6cc617b8-e833-4f52-88c0-26efaf53b24d',
host: 'localhost:3001',
'accept-encoding': 'gzip, deflate, br',
connection: 'keep-alive',
'content-length': '160'
}

### 响应对象

res 对象表示 Express 应用在收到 HTTP 请求时发送的 HTTP 响应
`//res.statusCode = 201; // 设置响应码
  // res.write("a");
  // res.write("b");
  // res.write("c");
  // res.end(); // print 'abc' on page
  // res.end("Abc"); // print 'Abc'
  // res.send("<h2>123</h2>");
  // res.cookie("foo", "bar");
  //res.status(201).send({ msg:"I'm OK"});
 `

## 案例

通过创建一个简单的 CRUD 接口服务来掌握 Express 的基本用法 <br/>
GET /todos <br/>
GET /todos/:id //动态路径, ":id""表示一个任意的数据, 比如 1 2 ...100 通过"req.params.id" 获取<br/>
POST /todos <br/>
PATCH /todos/:id <br/>
DELETE /todos/:id <br/>

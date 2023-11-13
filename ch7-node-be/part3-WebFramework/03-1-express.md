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

# webpack

## webpack5 从入门到放弃

### webpack 功能

<ul>
<li>打包:将不同类型资源按模块处理进行打包</li>
<li>静态:打包后最终产出静态资源</li>
<li>模块:webpack支持不同规范的模块化开发</li>
</ul>

#### webpack 上手

```bash
npm i webpack webpack-cli -D
npx webpack  # 忽略warning

├── dist              #打包后的文件夹
│   └── main.js
├── src
│   ├── js
│   │   ├── api.js
│   │   └── utils.js
│   └── index.js
├── index.html
├── package-lock.json
└── package.json
```

```html
<body>
  <script src="./dist/main.js"></script>
</body>
```

```js
// index.js
import { sum, square } from "./js/utils.js";
const person = require("./js/api.js");
console.log(sum(Math.floor(Math.random() * 10), 3));
console.log(square(4));
console.log(person);
// api.js
module.exports = {
  name: "zs",
  age: 14,
};
// util.js
const sum = (m, n) => m + n;
const square = (m) => m * m;

export { sum, square };
```

## webpack 实战

是一款模块打包工具

```bash
mkdir hello-webpack
cd hello-webpack
npm init -y
npm i webpack webpack-cli -D
npx webpack -v # 5.x
```

```html
<!--index.html-->
<body>
  <script src="./dist/bundle.js"></script>
</body>
```

```js
// add-content.js
export default function () {
  document.write("Hello, world!");
}
```

```js
// index.js
import addContent from "./add-content";
document.write("My First Webpack app.<br/>");

addContent();
```

打包

```bash
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
```

浏览器打开 index.html<br/>
将命令配到 package.json 的 scripts 中

```json
//...
  "scripts": {
    "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
  },
//...
```

重新打包<br/>
`npm run build` <br/>

webpack 默认源代码入口是`src/index.js`, 将 index.js&add-content.js 移动到 src 下后，命令要简化为:

```bash
  "scripts": {
    "build": "webpack --output-filename=bundle.js --mode=development"
  },
```

webpack 配置参数`npx webpack -h`<br/>
webpack 配置项太多，有简单的办法就是将配置配到`webpack.config.js`文件中:

```js
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // output.path要求使用绝对路径，webpack帮做了join(path+dist)
  },
  mode: "development",
};
```

package.json 的 build script 进一步简化:
命令要简化为:

```bash
  "scripts": {
    "build": "webpack"
  },
```

### webpack-dev-server @Deprecated

```bash
npm i webpack-dev-server -D
```

在 package.json 中添加:

```bash
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
```

在 webpack.config.js 中添加:

```js
module.exports = {
  // ...
  mode: "development",
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "8888", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
};

// previous version
module.exports = {
  // ...
  mode: "development",
  devServer: {
    publicPath: "./dist",
  },
};
```

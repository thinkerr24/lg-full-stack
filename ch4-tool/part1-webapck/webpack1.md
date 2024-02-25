# webpack

## webpack5 从入门到放弃

### webpack 功能

<ul>
<li>打包:将不同类型资源按模块处理进行打包</li>
<li>静态:打包后最终产出静态资源</li>
<li>模块:webpack支持不同规范的模块化开发</li>
</ul>

#### webpack 上手

默认打包入口:src/index.js

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

#### webpack 配置文件

如果需要更换打包入口文件(比如 src/main.js), 且输出目录名由 dist 改为 build，
则需要在 webpack 命令后面加入参数:

```bash
npx webpack --entry ./src/main.js --output-path ./build # 注意index.html的script标签路径同步更改
```

将上述目录移到 package.json 的 scripts 中:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --entry ./src/main.js --output-path ./build"
  },
```

就可以通过命令`npm run build`简洁运行<br/>
可以将上述参数移到`webpack.config.js`中，层次更加清晰(将 src/main.js 改回 src/index.js)

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

package.json 的 scripts 里的 build 命令可简化为:`"build": "webpack"`

#### webpack 依赖图

1.要把需要打包的依赖导入到 src/index.js 中来; <br/> 2.自定义 webpack.config.js 名后，在 scripts 脚本中指定新配置文件名，如:<br/>
`"build": "webpack --config rr.webpack.js"`

#### CSS-loader

<ul>
<li>1.为什么需要loader</li>
<li>2.loader是什么</li>
<li>3.css-loader</li>
</ul>
添加文件

```js
// src/js/login.js
function login() {
  const oH2 = document.createElement("h2");
  oH2.innerHTML = "rr learn webpack";
  oH2.className = "title";
  return oH2;
}

document.body.appendChild(login());

// src/index.js
import "./js/login.js";
```

重新打包`npm run build`, 打开 index.html

再次添加文件 src/css/login.css:

```css
.title {
  color: red;
}
```

src/js/login.js 第一行加入 import: `import "../css/login.css";`
再次 run build 发现报错。需要一个合适的 loader<br/>

安装 css-loader:`npm i css-loader -D`<br/> 1.行内 loader(修改 src/js/login.js 第一行):
`import "css-loader!../css/login.css";` build 不报错但是样式未生效，还需要一个 loader...<br/> 2.恢复 login.js import 后, 在 webpack.config.js 添加:

```js
  module: {
    rules: [
      //   {
      //     test: /\.css$/, // 一般是一个正则表达式，用于匹配我们需要处理的文件类型
      //     use: [
      //       {
      //         loader: "css-loader",
      //         // options:
      //       },
      //     ],
      //   },

      // 简写方式1
      //   {
      //     test: /\.css$/,
      //     loader: "css-loader",
      //   },
      // 简写方式2
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
```

因为 css-loader 只起到让 webpack 识别 css 文件的功能，具体样式生效还需要下一个 loader

#### style-loader

`npm i style-loader -D`<br/>
webpack.config.js 修改:`use: ["style-loader", "css-loader"],`<br/>
loader 默认加载顺序: 从右往左，从下往上<br/>
重新 build，运行

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

```

```

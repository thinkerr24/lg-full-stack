# NodeJS

### 安装&环境变量

## 全局对象
#### global(和browser端的window对象区分)

 `var message = "hello"
console.log(global.message) // undefined
`

#### 只导出一个变量
`module.exports = function() { xxx }`


#### 模块包装函数
`(module wrapper function)
(function(exports, require, module, __filename, __dirname){
	// entire module code lives here
});
`
##### module.exports 和 exports区别


### 内置模块 
***path, File system***

`fs.readdir("./", function (error, files) {
    // 错误优先回调函数，第一个函数永远是error
  console.log(error); // null
  console.log(files);
});`

## npm
>package.json 记录软件包的名字+版本
package-lock.json 记录软件包及软件包的依赖包的下载地址及版本


xxx@^m.a.b 主要版本，次要版本，补丁版本
^xx.yy.zz
~xx.yy.zz

npm list --depth 0
npm view lodash

npm outdated/ npm update

### 项目依赖/开发依赖
生产环境: npm install --prod // 跳过安装DevDependences里的依赖

### 全局安装和本地安装
npm root -g // 查看路径
npm-check-updates // ncu -u


## npmjs.org上发布package
1.sign up 2.npm login 3.npm publish
更新版本号
npm version major/minor/patch
撤销软件包(24小时)
npm unpublish <pkg> --force

更改npm镜像地址   
npm config list
npm config set registry https://registry.npm.taobao.org  
npm config set registry https://registry.npmjs.org
>npm config get userconfig | cat .npmrc

### npx两个作用
1.临时安装软件包执行后删除 npx create-react-app helloworld
2.执行本地安装的软件包 在应用中可以通过npx调用node_modules文件夹中安装的命令工具


### node项目默认入口文件 package.json "main": "index.js",
node index.js or node foldername

### 模块查找规则
1.带路径
const server = require('./server');
a.同级目录的server.js
b.同级目录的server.json
c.server目录的package.json main(默认index.js)

2.不带路径
const server = require('server');
按nodule.paths顺序

### I/O模型
同/异步I/O 区别: CPU是否等待I/O结果
Node采用异步非阻塞I/O模型

## 进程与线程
### JS单线程OR多线程 
libuv
一个主线程+线程池中4个线程，前者执行同步代码，后者执行异步代码  
`const crypto = require("crypto");   
 for (let i = 0; i < 2; i++) {
  crypto.pbkdf2Sync("srcret", "salt", 10000, 512, "sha512"); // sync
  // crypto.pbkdf2('srcret', 'salt', 10000, 512, 'sha512') // async
}
`

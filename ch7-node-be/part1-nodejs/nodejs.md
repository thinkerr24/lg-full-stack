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

## 回调
callback -> call then back, 调用后返回
在主函数b中调用参数函数a，参数函数调用完成后返回主函数继续执行主函数中的代码   
`
function a() {
    console.log('a is running')
}
function b(callback) {
    console.log('b start');
    callback(); // a is running
    console.log('b end');
}
b(a);
`
>为什么在B函数中不直接调用A函数而要通过参数的方式传递进去?
通常在编写应用程序时，B函数都是语言内部或者其他开发者定义好的，我们看不到内部代码或者说不能直接在他内部代码中插入我们的代码，而我们又想介入程序的执行，此时就可以通过回调函
数的方式将我们的逻辑传递给 B 函数，B 函数在内部再来调用这个回调函数。

```
function readFile(filePath, defaultCoding = "utf-8") {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, defaultCoding, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
// solution 1
readFile("./a.txt")
  .then(function (data) {
    console.log(data);
    return readFile("./b.txt");
  })
  .then(function (data) {
    console.log(data);
    return readFile("./c.txt");
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });

  // solution 2
  Promise.allSettled([
  readFile("./a.txt"),
  readFile("./b.txt"),
  readFile("./c.txt"),
])
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });

readAPromise.then(function(result) {
    console.log(result);
}).catch(function(error) {
    console.error(error);
});
// solution 3
const fs = require("fs");

function readFile(filePath, defaultCoding = "utf-8") {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, defaultCoding, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

(async function() {
  const aFile = await readFile('./a.txt');
  const bFile = await readFile('./b.txt');
  const cFile = await readFile('./c.txt');
  console.log(aFile, bFile, cFile);
})();
  ```

### 异步函数
```
async function f() {
  return "a";
}

// console.log(f()); // Promise { 'a' }
f()
  .then(function (data) {
    console.log(data); // a
  })
  .catch(function (error) {
    console.error(error);
  });
```

#### 使用promisify方法
去掉readFile Promise函数中的回调
```
const fs = require("fs");
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

async function readAllFile() {
  const aFile = await readFile("./a.txt", "utf-8");
  const bFile = await readFile("./b.txt", "utf-8");
  const cFile = await readFile("./c.txt", "utf-8");
  return [aFile, bFile, cFile];
}

readAllFile().then(([a, b, c]) => console.log(a, b, c));
```
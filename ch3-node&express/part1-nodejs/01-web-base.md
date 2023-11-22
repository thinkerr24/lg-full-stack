# Web Overvew

## 网站组成
1.用户界面(视图层) js+html+css
2.业务逻辑(控制层) Java/Nodejs
3.数据(模型层) Mysql/Mongodb

## web服务器/客户端

### Demo
`const http = require("http");
const server = http.createServer((req, res) => {
  // res.end('<h1>Hello, NodeJS!</h1>');
  if (req.url === "/") {
    res.write("Hello, Nodejs");
  } else {
    res.write(JSON.stringify([1, 2, 3]));
  }
  res.end();
});
server.listen(3000, () => {
  console.log("server is listening on 3000 port!");
});
`
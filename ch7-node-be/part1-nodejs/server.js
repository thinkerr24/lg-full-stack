const http = require("http");

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

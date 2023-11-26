const Koa = require("./koa");
const fs = require("fs");
const { promisify } = require("util");

const app = new Koa();

const a1 = async (ctx, next) => {
  // read File
  // const data = await promisify(fs.readFile)("./package.json");

  // read Stream
  // const data = fs.createReadStream("./package.json");
  const data = { foo: "bar", isLarge: false };
  ctx.body = data;
};

// const a2 = async (ctx, next) => {
//   console.log(ctx.response.body, ctx.body);
// };

// const a3 = (ctx, next) => {
//   console.log(">> three");
//   next();
//   console.log("<< three");
// };

app.use(a1);
//app.use(a2);
// app.use(a3);

app.listen(3002);

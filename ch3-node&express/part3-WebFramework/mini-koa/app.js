const Koa = require("./koa");

const app = new Koa();

const a1 = async (ctx, next) => {
  ctx.response.body = "Hello Koa";
  next();
};

const a2 = async (ctx, next) => {
  console.log(ctx.response.body, ctx.body);
};

// const a3 = (ctx, next) => {
//   console.log(">> three");
//   next();
//   console.log("<< three");
// };

app.use(a1);
app.use(a2);
// app.use(a3);

app.listen(3002);

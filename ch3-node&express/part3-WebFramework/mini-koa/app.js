const Koa = require("./koa");

const app = new Koa();

const a1 = (ctx, next) => {
  console.log(">> one");
  next();
  console.log("<< one");
};

const a2 = (ctx, next) => {
  console.log(">> two");
  next();
  console.log("<< two");
};

const a3 = (ctx, next) => {
  console.log(">> three");
  next();
  console.log("<< three");
};

app.use(a1);
app.use(a2);
app.use(a3);

app.listen(3002);

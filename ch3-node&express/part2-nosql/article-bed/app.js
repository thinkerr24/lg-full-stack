const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const app = express();

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到req.body中
// 注意: 一定要在使用之前就挂载这个中间件
// 不加这行req.body就是undefined
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Hello, express</h2>");
});

app.post("/articles", async (req, res, next) => {
  try {
    // 1.获取客户端表单数据
    const { article } = req.body;
    const { title, description, body } = article;
    // 2.数据验证
    if (!article || !title || !description || !body) {
      return res.status(422).json({
        error: "请求参数不符合规则要求",
      });
    }
    // 3.把验证通过的数据插入数据库中
    //      成功->发送成功响应
    //      失败->发送失败响应
    await client.connect();
    const collection = client.db("test").collection("articles");
    article.createAt = new Date();
    article.updateAt = new Date();
    const result = await collection.insertOne(article);

    article._id = result.insertedId;
    console.log(result); // 获取请求体数据
    res.status(201).json({
      article,
    });
  } catch (err) {
    // 由错误处理中间件统一处理
    next(err);
    // res.status(500).json({
    //   error: err.message,
    // });
  }
});

app.get("/articles", async (req, res, next) => {
  try {
    let { _page = 1, _size = 10 } = req.query;
    _page = parseInt(_page);
    _size = parseInt(_size);
    await client.connect();
    const collection = client.db("test").collection("articles");
    const result = await collection
      .find() // 查询
      .skip((_page - 1) * _size) // 跳过多少条
      .limit(_size); // 拿多少条
    const articleCount = await collection.countDocuments();
    res.status(200).json({
      articles: await result.toArray(),
      articleCount,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/articles/:id", async (req, res, next) => {
  try {
    await client.connect();
    const collection = client.db("test").collection("articles");
    const article = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
});

app.patch("/articles/:id", async (req, res, next) => {
  try {
    await client.connect();
    const collection = client.db("test").collection("articles");

    collection.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body.article,
      }
    );
    const article = await collection.findOne(new ObjectId(req.params.id));
    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/articles/:id", (req, res) => {
  res.send("delete /articles/:id");
});

// 它之前的所有路由中调用next(err)就会进入这里
// 注意: 4个参数缺一不可
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log("app listening at port 3000.");
});

const express = require("express");
const { getDb, saveDb } = require("./db");

const app = express();

// 配置解析表单请求体: application/json
app.use(express.json());

// 解析表单请求体: application/x-www-form-urlencoded
app.use(express.urlencoded());

app.get("/todos", async (req, res) => {
  try {
    const data = await getDb();
    res.status(200).json({
      data: data.todos,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { todos } = await getDb();
    const item = todos.find((todo) => String(todo.id) === id);
    if (!item) {
      res.status(404).json({
        error: "todo id not found",
      });
    } else {
      res.status(200).json(item);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/todos", async (req, res) => {
  // 1.获取客户端请求体参数
  /**
   {
    "title": xxx 
   }
   */
  const { title } = req.body;
  // 2.数据校验
  if (!title) {
    res.status(422).json({
      error: "The field title is required.",
    });
  } else {
    // 3.操作数据库
    const db = await getDb();
    const lastTodo = db.todos[db.todos.length - 1];
    db.todos.push({
      id: (lastTodo ? lastTodo.id : 0) + 1,
      title,
    });

    await saveDb(db);
    // 4.发送成功响应
    res.status(200).json({ title });
  }
});

app.listen(3001, () => console.log("express server running at port 3001"));

// 路由模块
const express = require("express");

// 1.创建路由实例
// 路由实例其实就相当于一个min Express实例
const router = express.Router();

// app.get app.post

// 2.配置路由
router.get("/foo", (req, res) => {
  res.send("get foo");
});

router.post("/foo", (req, res) => {
  res.send("post foo");
});

// 3.导出路由实例
// export default router
module.exports = router;

// 4.去app.js中将此路由集成到Express实例应用中
/**
 * const router = require('./router');
 * app.use(router); // url:/foo
 * app.use('/todos', router); // url:/todos/foo
 */

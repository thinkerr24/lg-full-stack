# Mongodb

Link: [《MongoDB 教程》](https://www.yuque.com/lipengzhou/mongodb?#)

## NoSQL

> Not only SQL，比起传统的关系型数据库 RDB，更高性能，更容易拓展，非强制数据关系

MongoDB 使用场景: 1.大量低价值数据且性能要求高; 2.用作缓存层; 3.需要高度伸缩性，可用 MongoDB 服务器搭建集群环境

### 安装

官网安装 community 版(zip 包) <br/>
解压后将 bin 目录配置到 path 环境变量中<br/>
mongod --version<br/>
mongo --version

### 启动与停止 MongoDB 服务

mongod --dbpath="数据存储目录" 默认占用本地 27017 端口<br/>
mongod --dbpath="C:\mysoftware\installation\mongodb-win32-x86_64-2012plus-4.2.24\data"

新开一个控制台 cmd<br/>
mongo
'>'
不要跨盘符访问

### 使用 mongo shell

不用单独下，直接运行命令 mongo，如需指定端口: mongo --port 28015
提供了一个 JS 执行环境，可以直接 1 + 1
连接远程:
`mongo "mongodb://bob@mongodb0.example.com:28015/?authSource=admin"`

`mongo --host mongodb://bob@mongodb0.example.com:28015`

`mongo --host mongodb://bob@mongodb0.example.com --port 28015`

`mongo --username bob --password --authenticationDatabase admin --host mongodb0.example.com`

##### 基本命令

```
show dbs; db; use database; show collections ...
db.users.insert({name: 'Ray', age: 26})
```

退出: exit; quit(); Ctrl+c

## 基础概念

MongoDB 是文档型数据库，存储的数据是 JSON 格式
可以把 MongoDB 数据库想象为一个超级大对象，对象中有不同的集合，集合中有不同的文档

MongoDB RDB <br/>
Collection Table <br/>
Document Row <br/>
Field Column <br/>

#### 数据库

在 MongoDB 中，数据库包含一个或多个文档集合
查看数据库列表:

> show dbs

默认数据库为 test，如果没创建新的数据库，集合将存放在 test 数据库中

> 切换(创建)库/查看当前库(库名小写)
> use dbname/db

note:通过 use 创建的新库不会显示，只有插入数据时才显示

> db.[CollectionName].insert({[js Obj]})

> db.[CollectionName].find()

删库，先切换载 drop

> use dbname ; db.dropDatabase()

#### 集合

类似关系型 db 中的表，MongoDB 将文档存储在集合中

> show collections

> db.[CollectionName].drop()

#### 文档

MongoDB 将数据记录成 BSON(Binary JSON)文档, 是 JSON 文档的二进制表示形式，比 JSON 包含更多的数据类型
字段\_id 保留作为主键，它的值在集合中必须是唯一的，不可变的，并且是数组以外的任何类型

## 基础操作(CRUD)

#### 图形管理软件

nosqlbooster/Navicat/MongoDB Compass/Studio 3T

#### 插入

```bash
db.collection.insertOne({}) // return id
db.collection.insertMany([]) // return ids
db.collection.insertOne() // not recommend
```

### 查询

```bash
db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
```

`db.collection.find(query, projection)` // query(Optional):使用查询操作符指定查询条件；<br/>
projection(Optional):使用投影操作符指定返回的键，查询时返回文档中所有的键值，一般省略

db.collection.findOne() // 查询第一个满足匹配条件的

指定返回哪些字段:

```bash
db.inventory.find({}, {
    item: 1,
    qty: 1
})`
#相等条件查询:
db.inventory.find({
    status: 'A'
})
```

AND 查询(status = 'A' && qty < 30):

```bash
db.inventory.find({
    status: 'A',
    qty: {$lt: 30}
})
```

OR 查询(status = 'A' || qty < 30)

```json
{
  "_id": "654babc6acd15495a22df20d",
  "item": "journal",
  "qty": 25,
  "size": {
    "h": 14,
    "w": 21,
    "uom": "cm"
  },
  "status": "A"
}
```

AND + OR(status = 'A' && (qty < 30||item start with p))

```bash
db.inventory.find({
  status: "A",
  $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
})
```

查询操作符
$gte $ne $nin, $and $nor
https://www.mongodb.com/docs/manual/reference/operator/query/

查询嵌套文档

> 整个嵌入式/嵌套文档上的相等匹配要求与指定文档（包括字段顺序）完全匹配

查询数组

查询嵌入文档的数组

指定从查询返回的项目字段

查询空字段或缺字段

### 更新

```bash
db.collection.updateOne(filter, update, options)
db.collection.updateMany(filter, update, options)
db.collection.replaceOne(filter, update, options)

db.cn.updateMany(
  {age: {$lt: 18}},
  {$set: {status: "reject"}}
)
```

### 删除

```
db.collection.deleteMany({})
db.collection.deleteOne({})
```

## Nodejs + MongoDB

在服务端操作 [MongoDB](https://www.mongodb.com/docs/drivers/)

在[Node.js](https://www.mongodb.com/docs/drivers/node/current/)中操作 MongoDB

### First Try

init npm project + install [mongodb](https://www.npmjs.com/package/mongodb) package, then refer the site

### 接口规范

一个文章 CRUD 项目 with RESTful 接口 article-bed

> mongod --dbpath="C:\mysoftware\installation\mongodb-win32-x86_64-2012plus-4.2.24\data"

```js
// 使用cloud.mongodb上免费云mongodb数据库连接字符串
const uri =
  "mongodb+srv://thinkerr24:nQEyQpTpYZH6t8Aw@cluster0.mcltnpy.mongodb.net/?retryWrites=true&w=majority";
```

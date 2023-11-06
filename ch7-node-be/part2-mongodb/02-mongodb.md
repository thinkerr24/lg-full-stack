# Mongodb

Link: https://www.yuque.com/lipengzhou/mongodb?# 《MongoDB 教程》

## NoSQL
> Not only SQL，比起传统的关系型数据库RDB，更高性能，更容易拓展，非强制数据关系

MongoDB使用场景: 1.大量低价值数据且性能要求高; 2.用作缓存层; 3.需要高度伸缩性，可用MongoDB服务器搭建集群环境


### 安装
官网安装community版(zip包)
解压后将bin目录配置到path环境变量中
mongod --version
mongo --version


### 启动与停止MongoDB服务
mongod --dbpath="数据存储目录" 默认占用本地27017端口
mongod --dbpath="C:\mysoftware\installation\mongodb-win32-x86_64-2012plus-4.2.24\data"

新开一个控制台cmd
mongo
'>'
不要跨盘符访问

### 使用mongo shell
不用单独下，直接运行命令mongo，如需指定端口: mongo --port 28015 
提供了一个JS执行环境，可以直接 1 + 1
连接远程:
mongo "mongodb://bob@mongodb0.example.com:28015/?authSource=admin"

mongo --host mongodb://bob@mongodb0.example.com:28015

mongo --host mongodb://bob@mongodb0.example.com --port 28015

mongo --username bob --password --authenticationDatabase admin --host mongodb0.example.com

##### 基本命令
show dbs; db; use database; show collections ...
db.users.insert({name: 'Ray', age: 26})

退出: exit; quit(); Ctrl+c

## 基础概念
MongoDB是文档型数据库，存储的数据是JSON格式
可以把MongoDB数据库想象为一个超级大对象，对象中有不同的集合，集合中有不同的文档

MongoDB             RDB
Collection          Table
Document            Row
Field               Column

#### 数据库
在MongoDB中，数据库包含一个或多个文档集合
查看数据库列表:
> show dbs

默认数据库为test，如果没创建新的数据库，集合将存放在test数据库中
>切换(创建)库/查看当前库(库名小写)
use dbname/db

note:通过use创建的新库不会显示，只有插入数据时才显示
> db.[CollectionName].insert({[js Obj]})

> db.[CollectionName].find()

删库，先切换载drop
> use dbname ; db.dropDatabase()

#### 集合
类似关系型db中的表，MongoDB将文档存储在集合中
> show collections

> db.[CollectionName].drop()

#### 文档
MongoDB将数据记录成BSON(Binary JSON)文档, 是JSON文档的二进制表示形式，比JSON包含更多的数据类型
字段_id保留作为主键，它的值在集合中必须是唯一的，不可变的，并且是数组以外的任何类型

## 基础操作(CRUD)

#### 图形管理软件
nosqlbooster/Navicat/MongoDB Compass/Studio 3T

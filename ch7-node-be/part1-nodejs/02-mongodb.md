# Mongodb

Link: https://www.yuque.com/lipengzhou/mongodb?# 《MongoDB 教程》

## NoSQL
> Not only SQL，比起传统的关系型数据库RDB，更高性能，更容易拓展，非强制数据关系

MongoDB使用场景: 1.大量低价值数据且性能要求高; 2.用作缓存层; 3.需要高度伸缩性，可用MongoDB服务器搭建集群环境


### 安装
官网安装community版(zip包)
解压后将bin目录配置到path环境变量中
mongod --version


### 启动与停止MongoDB服务
mongod --dbpath="数据存储目录" 默认占用本地27017端口
mongod --dbpath="C:\mysoftware\installation\mongodb-win32-x86_64-2012plus-4.2.24\data"

新开一个控制台cmd
mongo
'>'

不要跨盘符访问

# Express 接口案例

使用 Express 开发接口服务 <br/>

1.[Github](https://github.com/gothinkster/realworld) <br/> 2.[Demo](https://demo.realworld.io/) <br/> 3.[API Doc](https://github.com/gothinkster/realworld/tree/main/api) <br/>

## RESTful 借口设计规范

### 协议

API 与用户的通信协议:尽量使用 https 协议

### 域名

应该尽量将 API 部署在专有域名之下
`https://api.example.com` <br/>
如果确定 API 很简单，不会有进一步扩展，可以考虑放在主域名下: <br/>
`https://example.org/api/`

### 版本

应该将 API 的版本号放入 URL 中:<br/>
`https://api.example.com/v1/` <br/>
另外一种做法是，将版本号放在 HTTP 头信息中(如 Github)，但不如放在 URL 方便只管

### 路径

路径又称 "终点"(endpoint), 表示 API 的具体网址。<br/>

在 RESTful 架构中，每个网址代表一种资源(resource), 所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的 "集合"(collection), 所以 API 中的名词也应该使用复数。

举例来说，有一个 API 提供动物园(zoo)的信息，还包括各种动物和雇员的信息，则路径设计如下:<br/>

<ul>
<li>https://api.example.com/v1/zoos</li>
<li>https://api.example.com/v1/animals</li>
<li>https://api.example.com/v1/employees</li>
</ul>

### HTTP 动词

对于资源具体操作类型，由 HTTP 动词表示，常见的有五个(括号里是对应的 SQL 命令):<br/>

<ul>
<li>GET(读取)：从服务器取出资源(one or many item)</li>
<li>POST(创建): 在服务器新建一个资源</li>
<li>PUT(完整更新): 在服务器更新资源(客户端提供改变后的完整资源)</li>
<li>PATCH(部分更新): 在服务器更新资源(客户端提供改变的属性)</li>
<li>DELETE(删除): 从服务器删除资源</li>
</ul>

另外还有两个不常用的 HTTP 动词:

<ul>
<li>HEAD: 获取资源的元数据</li>
<li>OPTIONS: 获取信息，关于资源的哪些属性是客户端可以改变的</li>
</ul>

Examples:<br/>

<ul>
<li>GET /zoos: 列出所有动物园</li>
<li>POST /zoos: 新建一个动物园</li>
<li>POST /zoos/ID: 根据ID获取某个指定动物园信息</li>
<li>PUT /zoos/ID: 更新某个指定动物园信息(提供该动物园的全部信息)</li>
<li>PATCH /zoos/ID: 更新某个指定动物园信息(提供该动物园的部分信息)</li>
<li>DELETE /zoos/ID: 删除某个动物园</li>
<li>GET /zoos/ID/animals: 列出某个指定动物园的所有动物</li>
<li>>DELETE /zoos/ID/animals/ID: 删除某个指定动物园的指定动物</li>
</ul>

### 过滤信息

如果记录的数量很多，服务器不可能将它们都返回给用户。API 应该提供参数，过滤返回结果，下面是一些常见的参数:

<ul>
<li>?limit=10: 指定返回记录的数量</li>
<li>?offset=10: 指定返回记录的开始位置</li>
<li>?page=2&per_page=10: 指定第二页，每页10条数据</li>
<li>?sortby=name&order=asc: 指定返回结果按照哪个属性排序，以及排序顺序</li>
<li>?animal_type_id=1: 指定筛选条件</li>
</ul>

参数的设计允许存在冗余，即允许 API 路径和 URL 参数偶尔有重复。比如 GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的

### 状态码

客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

HTTP 状态码是一个三位数，分成五个类别([100 多种](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)):

<ul>
<li>1xx: 相关信息</li>
<li>2xx: 操作成功</li>
<li>3xx: 重定向</li>
<li>4xx: 客户端错误</li>
<li>5xx: 服务端错误</li>
</ul>

服务器应该尽可能返回精确的状态码<br/>
常见的有(括号中是该状态码对应的 HTTP 动词):

<ul>
<li>200 OK-[*]: 服务器成功返回用户请求的数据，该操作是幂等的(Idempotent)</li>
<li>201 CREATED-[POST]: 用户新建或修改数据成功</li>
<li>202 Accepted-[*]: 表示一个请求已经进入后台排队(异步任务) </li>
<li>204 NO CONTENT-[DELETE]: 用户删除数据成功</li>
<li>400 Bad Request-[POST/PUT/PATCH]: 由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求，该操作是幂等的</li>
<li>401 Unauthorized -[*]: 表示用户没有权限(令牌、用户名、密码错误)</li>
<li>403 Forbidden -[*]:客户端没有访问内容的权限；也就是说，它是未经授权的，因此服务器拒绝提供请求的资源 (与 401 Unauthorized 不同，服务器知道客户端的身份)</li>
<li>404 NOT FOUND -[*]: 用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的</li>
<li>406 Not Acceptable -[GET]: 用户请求的格式不可得(比如用户请求的JSON格式，但是只有XML格式)</li>
<li>410 Gone -[GET]: 用户请求的资源被永远删除，且不会再得到</li>
<li>422 Unprocesable entity - [POST/PUT/PATCH]: 请求格式正确，但由于语义错误而无法遵循</li>
<li>429 Too Many Requests: 用户在给定的时间内发送了太多请求（"限制请求速率"）</li>
<li>500 Internal Server Error -[*]: 服务器遇到了不知道如何处理的情况</li>
</ul>

### 返回接口

API 返回的数据格式，不应该是纯文本，而应该是应该 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json。

针对不同操作，服务器向用户返回的结果应该符合以下规范:

<ul>
<li>GET /collection: 返回资源对象的列表(数组)</li>
<li>GET /collection/resource: 返回单个资源对象</li>
<li>POST /collection: 返回新生成的资源对象</li>
<li>PUT /collection/resource: 返回完整的资源对象</li>
<li>PATCH /collection/resource: 返回完整的资源对象</li>
<li>DELETE /collection/resource: 返回一个空文档</li>
</ul>

### 错误处理

一种不恰当的做法:发生错误还返回 200 状态码，把错误信息放在数据体里

```
HTTP/1.1 200 OK
Content-Type: applcation/json

{
    "status": "failure",
    "data": {
        "error": "xxxx"
    }
}
```

上面代码中，解析数据体之后才能得知操作失败 <br/>
正确的做法是，状态码反映发生的错误，具体错误信息放在数据体里返回。例子:

```
HTTP/1.1 400 Bad Request
Content-Type: applcation/json

{
    "status": "Invalid payload",
    "data": {
        "error": "This field is required."
    }
}
```

### 身份认证

基于[JWT](https://jwt.io/)的接口权限认证

<ul>
<li>字段名: Authorization</li>
<li>字段值: Bearer token数据</li>
</ul>

### 跨域处理

可以在服务端设置[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)允许客户端跨域资源请求

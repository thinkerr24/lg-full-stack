## Vue CLI(现在推荐 Vite)

[Vue CLI](https://cli.vuejs.org/zh/) 是一个基于 Vue.js 进行快速开发的完整系统，称为脚手架工具。
好处:

<ul>
<li>统一项目的架构风格</li>
<li>初始化配置项目依赖</li>
<li>提供单文件组件</li>
</ul>

操作方式: 命令行工具

<ul>
<li>安装</li>
<li>项目搭建</li>
<li>目录与文件</li>
<li>打包与部署</li>
</ul>

#### 安装

```sh
npm install -g @vue/cli
vue --version
# 升级cli版本
npm update -g @vue/cli
```

#### 项目搭建

创建项目:<br/>
`vue create project-demo`

选择 preset(预设)，选择包管理器，创建完成
![vue preset demo](img/vue-cli-preset.png)

```sh
### 运行
npm run serve
### http://localhost:8080/#/
```

预设保存路径:C:\Users\username\\.vuerc<br/>
不需要预设的时候可以直接删掉这个文件

#### 目录与文件

```bash
project-structure
├── public                  # 预览文件目录
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets              # 静态资源目录
│   │   └── logo.png
│   ├── components          # 项目组件目录
│   │   └── HelloWorld.vue
│   ├── router
│   │   └── index.js
│   ├── views
│   │   ├── AboutView.vue
│   │   └── HomeView.vue
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .browserslistrc
├── .eslintrc.js
├── README.md
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
└── vue.config.js
```

单文件组件可以将组件的功能统一保存在以.vue 为拓展名的文件中。

```html
<!--.vue文件三层结构-->
<template></template>
<script></script>
<style scoped></style>
```

#### 打包与部署

打包就是将 Vue CLI 项目编译为浏览器可识别的文件。<br/>
命令:

`npm run build ### 完成后生成 dist 目录`

部署指的是将 Vue 项目 dist 目录部署到服务器上<br/>
安装静态文件服务器<br>
` npm install -g serve`<br/>
在 dist 目录下通过 `serve` 命令部署 or 项目根目录下`serve dist`

## Vue Router

Vue Router 是 Vue.js 的官方插件，用来快速实现单页应用

<ul>
<li>单页应用</li>
<li>前端路由</li>
<li>Vue Router</li>
</ul>

### 单页应用

SPA(Single Page Application)单页面应用程序，简称单页应用。<br/>
指的是网站的"所有"功能都在单个页面中进行呈现。<br/>
具有代表性的有后台管理系统、移动端、小程序等。<br/>
优点：

<ul>
<li>前后端分离开发，提高了开发效率</li>
<li>业务场景切换时，局部更新结构</li>
<li>用户体验好，更加接近本地应用</li>
</ul>

缺点:

<ul>
<li>不利于SEO</li>
<li>初次首屏加载速度较慢</li>
<li>页面复杂度较高</li>
</ul>

### 前端路由

前端路由，指的是 URL 与内容间的映射关系<br/>
URL、内容、映射关系

<ul>
<li>Hash方式</li>
<li>History方式</li>
</ul>

#### Hash 方式

通过 hashchange 事件监听 hash 变化，并进行网页内容更新

```html
<body>
  <div>
    <a href="#/">首页</a>
    <a href="#/category">分类页</a>
    <a href="#/user">用户页</a>
  </div>
  <div id="container">这是首页功能</div>
  <script>
    const containerEle = document.getElementById("container");
    window.onhashchange = function () {
      const hash = location.hash.replace("#", "");
      let str = "";
      switch (hash) {
        case "/":
          str = "这是首页功能";
          break;
        case "/category":
          str = "这是分类功能";
          break;
        case "/user":
          str = "这是用户功能";
          break;
      }
      containerEle.innerHTML = str;
    };
  </script>
</body>
```

封装以备复用:

```js
const router = {
  routes: {},
  route(path, callback) {
    this.routes[path] = callback;
  },
  init() {
    const that = this;
    window.onhashchange = function () {
      const hash = location.hash.replace("#", "");
      that.routes[hash] && that.routes[hash]();
    };
  },
};

const containerEle = document.getElementById("container");
// 定义路由
router.route("/", function () {
  containerEle.innerHTML = "这是首页功能";
});
router.route("/category", function () {
  containerEle.innerHTML = "这是分类功能";
});
router.route("/user", function () {
  containerEle.innerHTML = "这是用户功能";
});
// 初始化路由
router.init();
```

特点总结:

<ul>
<li>Hash 方式兼容性好</li>
<li>地址中具有#, 不太美观</li>
<li>前进后退功能较为繁琐</li>
</ul>

#### History 方式

History 方式采用 HTML5 提供的新功能实现前端路由<br/>
在操作时需要通过 history.pushState()变更 URL 并执行对应操作

```js
const router = {
  routes: {},
  route(path, callback) {
    this.routes[path] = callback;
  },
  // 用于触发指定路由
  go(path) {
    console.log("go path:", path);
    history.pushState(null, null, path);
    this.routes[path] && this.routes[path]();
  },
};

const links = document.querySelectorAll("a");
const containerEle = document.querySelector("#container");
links.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    // 调用路由
    router.go(this.getAttribute("href"));
    e.preventDefault();
  });
});

// 定义路由
router.route("/", function () {
  containerEle.innerHTML = "这是首页功能";
});
router.route("/category", function () {
  containerEle.innerHTML = "这是分类功能";
});
router.route("/user", function () {
  containerEle.innerHTML = "这是用户功能";
});
```

前进后退功能，首先需要在更改 URL 时保存路由标记。

```js
go(path) {
    history.pushState({path}, null, path);
    //...
};
```

通过 popstate 事件监听前进后退按钮操作，并检测 state

```js
init() {
    const that = this;
    window.addEventListener('popstate', function(e) {
        const path = e?.state?.path ?? '/';
        that.routes[path] && that.routes[path]();
    });
}
```

调用初始化方法监听前进后退操作并处理

```js
router.init();
```

特点总结:

<ul>
<li>History 方式兼容性差(用到了H5新特性)</li>
<li>地址正常且能实现前进后退</li>
<li>刷新页面会请求后端url，要解决这个问题需后端配合</li>
</ul>

### Vue Router

是官方的路由管理器，让构建单页面应用变得易如反掌。

<ul>
<li>基本使用</li>
<li>动态路由</li>
<li>嵌套路由</li>
<li>编程式导航</li>
</ul>

#### 基本使用

直接下载 or CDN(v4 版本服务 Vue3，[v3](https://v3.router.vuejs.org/)版本服务 Vue2)<br/>
https://unpkg.com/vue-router@3.6.5/dist/vue-router.js

```bash
npm i vue-router@3.6.5
```

Vue Router 提供了用于进行路由设置的组件<router-link>与<router-view>

```html
<div id="app">
  <router-link to="/">首页</router-link>
  <router-link to="/category">分类</router-link>
  <router-link to="/user">用户</router-link>
  <router-view></router-view>
</div>
```

定义路由中需要的组件，并进行路由规则设置。

```js
const Index = {
  template: `<div>这是首页的功能</div>`,
};
const Category = {
  template: `<div>这是分类的功能</div>`,
};
const User = {
  template: `<div>这是用户的功能</div>`,
};

const routes = [
  { path: "/", component: Index },
  { path: "/category", component: Category },
  { path: "/user", component: User },
];
```

创建 Vue Router 实例，通过 routes 属性配置路由

```js
const router = new VueRouter({
  routes,
});
```

创建 Vue 实例，通过 router 属性注入路由

```js
const vm = new Vue({
  el: "#app",
  router,
});
```

#### 命名视图

如果导航后，希望同时在同级展示多个视图(组件)，这时就需要进行命名视图

```html
<div id="app">
  <router-link to="/">首页</router-link>
  <router-link to="/user">用户</router-link>

  <router-view name="side-bar"></router-view>
  <router-view></router-view>
</div>
```

路由中通过 components 属性进行设置不同视图的对应组件

```js
const SideBar = { template: `<div>这是侧边栏功能</div>` };
// ...
{
    path: '/',
    components: [
        sidebar: SideBar,
        default: Index
    ]
}
// ...
```

#### 动态路由

当我们需要将某一类 URL 都映射到同一个组件，就需要使用动态路由<br/>
定义路由规则时，将路径中的某个部分使用`:`进行标记，即可设置为动态路由。

```js
const User = { template: `<div>这是用户的功能</div>` };
const routes = [{ path: "/user/:id", component: User }];
```

设置为动态路由后，动态部分为任意内容均跳转到同一组件。

```html
<div id="app">
  <router-link to="/user/1">用户1</router-link>
  <router-link to="/user/2">用户2</router-link>
  <router-link to="/user/3">用户3</router-link>
  <router-view></router-view>
</div>
```

`:`部分对应的信息称为路径参数，存储在 vm.$route.params 中

```js
const User = {
  template: `<div>
    这是用户{{$route.params.id}}的功能
  </div>`,
};
```

##### 侦听路由参数

如果要响应路由的参数变化，可以通过 watch 监听$route

```js
const User = {
  template: `<div>这是{{$route.params.id}}功能</div>`,
  watch: {
    $route(route) {
      console.log(route);
    },
  },
};
```

##### 路由传参处理

这里通过路由的 props 设置数据，并通过组件 props 接收。

```js
const routes = [
  {
    path: "/user/:id",
    component: User,
  },
  {
    path: "/category/:id",
    component: Category,
    props: true,
  },
];

const User = {
  template: `<div>这是{{$route.params.id}}的功能</div>`,
};
const Category = {
  props: ["id"],
  template: `<div>这是{{id}}功能</div>`,
};
```

这里通过路由的 props 设置数据，并通过组件 props 接收。

```js
const routes = [
  {
    path: "/user/:id",
    component: User,
  },
  {
    path: "/category/:id",
    component: Category,
    props: true,
  },
];
```

这里通过路由的 props 设置数据，并通过组件 props 接收

```js
const User = {
  template: `<div>这是用户{{$route.params.id}} 的功能</div>`,
};
const Category = {
  props: ["id"],
  template: `<div>这是分类{{id}} 功能</div>`,
};
```

##### 路由传参处理其他方式

包含多个命名视图时，需要将路由的 props 设置为对象

```js
const SideBar = {
  template: `<div>这是侧边栏功能</div>`,
};
{
  path: '/category/:id',
  components: {
    default: Category,
    sidebar: SideBar
  },
  props: {
    default: true,
    sidebar: false
  }
}
```

如果希望设置静态数据，可将 props 中的某个组件对应的选项设置为对象，内部属性会绑定给组件的 props。

```js
const SideBar2 = {
  props: ["a", "b"],
  template: `<div>
  这是右侧侧边栏功能:{{a}} {{b}}
  </div>`,
};

{
  path: '/category/:id',
  components: {
    default: Category,
    sidebar: SideBar,
    sidebar2: SideBar2
  },
  props: {
    default: true,
    sidebar: false,
    sidebar2: {a: '状态1', b: '状态2'}
  }
}
```

#### 嵌套路由

实际场景中，路由通常由多层嵌套的组件组合而成，这时需要使用嵌套路由配置。<br/>
使用 children 来进行嵌套路由中的子路由设置。

```js
const routes = [
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "hobby",
        component: UserHobby,
      },
      {
        path: "info",
        component: UserInfo,
        children: [
          {
            path: "age",
            component: UserInfoAge,
          },
          {
            path: "school",
            component: UserInfoSchool,
          },
        ],
      },
    ],
  },
];
```

#### 编程式导航

编程式导航，指的是通过方法设置导航

<ul>
<li>router.push()用来导航到一个新URL</li>
<li>&lt;router-link&gt;的to属性使用绑定方式时也可传属性对象结构 </li>
</ul>

```js
vm.$router.push("/user");
vm.$router.push({ path: "/user" });
vm.$router.push({ path: "/user/123" });
```

```html
<router-link :to="{path: '/user/10'}">用户10</router-link>
```

##### 命名路由

设置路由时添加 name 属性

```js
const School = {
  template: `<div>School组件: {{$route.params}}</div>`,
};

const routes = [
  {
    path: "/user/:id/info/school",
    name: "school",
    component: School,
  },
];

// 在push()中通过name导航到对应路由，参数通过params设置
vm.$router.push({ name: "school", params: { id: 20, demo: "其他数据" } });
```

也可以在&lt;router-link&gt;中使用

```html
<router-link :to="{name: 'school', params: {id: 1}}">用户学校</router-link>
<router-link :to="{name: 'school', params: {id: 2}}">用户学校</router-link>
<router-link :to="{name: 'school', params: {id: 3}}">用户学校</router-link>
```

#### History 模式

需要通过 Vue Router 实例的 mode 选项来设置，这样 URL 会更加美观，但同样需要后端支持避免问题。

```js
const router = new VueRouter({
  mode: "history",
  routes: [
    //...
  ],
});
```

### 生成项目结构可使用

<ul>
<li><a href="https://www.npmjs.com/package/tree-node-cli">tree-node-cli</a> | tree-cli</li>
<li>自带的命令:tree</li>
<li>vscode插件<a href="https://blog.csdn.net/H_jrqn/article/details/129180523">project-tree</a></li>
</ul>

tree-node-cli in Windows10:<br/>
`treee -I "node_modules|.git|.gitignore" -a --dirs-first`

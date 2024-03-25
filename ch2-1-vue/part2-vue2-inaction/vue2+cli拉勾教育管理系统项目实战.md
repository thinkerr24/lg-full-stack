# 拉勾教育管理系统项目实战

技术栈 vue2 + vue router + vuex nodev18.12.0 npmv8.19.2 mirror:https://registry.npmmirror.com/

### 项目准备

#### 使用 Vue CLI 创建项目

```bash
npm install -g @vue/cli
vue create edu-boss-fed # Manually select features Babel+Router+Vuex+CSS Pre-processors+Linter/Formatter + v2
```

![选项](./img/vue-cli-createproj.png)

```bash
cd edu-boss-fed
npn run serve
access http://localhost:8080/#/
```

#### Git 版本管理

github 上创建 edu-boss-fed 项目(默认配置即可，无需任何勾选)，然后本地 cli 中运行

```bash
git init
git branch -M main
git remote add origin https://github.com/thinkerr24/edu-boss-fed.git
git remote -v
git push -u origin main # -u表示保存后续选项，之后push直接git push即可
```

#### 目录结构说明

```bash
edu-boss-fed
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   ├── views             # 页面级组件目录，类似React中的pages目录
│   │   ├── AboutView.vue
│   │   └── HomeView.vue
│   ├── App.vue
│   └── main.js
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── README.md
├── babel.config.js
├── jsconfig.json
├── lint-staged.config.js
├── package-lock.json
├── package.json
└── vue.config.js
```

#### 调整初始目录

删除 src 下(清空目录):<br/>
assets 目录的 logo 文件， components 下的 Helloworld.vue, views 下的两个 vue 文件 <br/>

新增 src/services src/styles src/utils <br/>

```js
// src/App.vue
<template>
  <div id="app">
      <h1>rr教育</h1>
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<style lang="scss">
</style>

// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由规则
const routes = []

const router = new VueRouter({
  routes
})

export default router

```

#### 代码规范和风格指南

[standardjs.com](https://standardjs.com/) <br/>
[airbnb/javascript](https://github.com/airbnb/javascript) <br/>
[.eslintrc.js](https://eslint.vuejs.org/) <br/>
[Vue.js Style Guide.](https://v2.cn.vuejs.org/v2/style-guide/)

#### 自定义检验规则

[ESLint](https://zh-hans.eslint.org/docs/latest/) <br/>
修改.eslintrc.js

```js
rules: {
  // ...
  // 'simi': off  保留分号
}
```

#### Element 组件库(样式与布局)

[官网](https://element.eleme.cn/#/zh-CN)<br/>
`npm i element-ui -S`

```js
// main.js
// 引入elementUI
import ElementUI from 'element-ui'
// 引入elementUI的主题(风格)文件
import 'element-ui/lib/theme-chalk/index.css'

// 将elementUI注册为Vue插件
Vue.use(ElementUI)

// App.vue
<template>
  <div id="app">
    <h1>rr教育</h1>
    <!-- 根路由出口 -->
    <router-view />

    <!-- 测试elementUI是否可用 -->
    <el-row>
      <el-button type="primary">主要按钮</el-button>
    </el-row>
  </div>
</template>
```

#### 样式处理

src/styles/index.scss & src/styles/variables.scss(见 github)

```js
// src/main.js
// import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义的全局样式文件
import "./styles/index.scss";
```

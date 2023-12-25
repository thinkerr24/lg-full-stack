# Vue

传统网页开发步骤<br/>
请求数据 -> 生成结构(dom) -> 监听变化 <br/>
元素变化 -> 发送请求 -> 更新结构 <br/>

缺点:<br/>

<ul>
<li>DOM 操作频繁，代码繁杂</li>
<li>DOM 操作与逻辑代码混合，可维护性差</li>
<li>不同功能区域书写在一起，可维护性低</li>
<li>模块之间的依赖关系复杂</li>
</ul>

如何解决, 引入 Vue.js, Vue.js 是前端流行框架 <br/>
渐进式(Progressive) Javascript 框架(没那么重，可以不完整或完全按照 Vue 规范开发，一步一步迁移)

### Vue.js 核心特性

数据驱动视图&组件化开发

#### 数据驱动视图:

数据变化会自动更新到对应元素中，无需手动操作 DOM，这种行为称作单项数据绑定。<br/>
对于输入框等可输入元素，可设置双向数据绑定 <br/>
双向数据绑定是在数据绑定的基础上，可自动将元素输入内容更新给数据，实现<code>数据</code>与<code>元素内容</code>的双向绑定。 <br/>

Vue.js 的数据驱动视图是基于 MVVM 模型实现的。<br/>

MVVM(Model-View-ViewModel)是一种软件开发思想<br/>

<ul>
<li>Model层，代表数据</li>
<li>View层，代表视图模板</li>
<li>ViewModel层，代表业务处理代码逻辑</li>
</ul>

优缺点:

<ul>
<li>基于MVVM模型实现的数据驱动视图解放DOM操作</li>
<li>View与Model处理分离，降低代码耦合度</li>
<li>但双向绑定时的Bug调试难度增大</li>
<li>大型项目的View与Model过多，维护成本高</li>
</ul>

#### 组件化开发:

组件化开发，允许我们将网页功能封装为自定义 HTML 标签，复用时书写自定义标签名即可。<br/>
组件不仅可以封装结构，还可以封装样式与逻辑代码，大大提高了开发效率与可维护性。

#### Vue.js 安装

<ul>
<li>本地引入: javascript标签src="lib/vue.js"</li>
<li>cdn引入: javascript标签src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"</li>
<li>npm安装: npm install vue</li>
</ul>

### Vue.js 基础语法

<ul>
<li>Vue实例</li>
<li>基础选项</li>
<li>指令</li>
<li>其他选项</li>
</ul>

#### Vue 实例

Vue 实例是通过 Vue 函数创建的对象，是使用 Vue 功能的基础<br/>

```js
// Vue2
const vm = new Vue({
  // 选项对象
});

// Vue3
//Vue.createApp({
// 选项对象
//});
```

#### el 选项

<ul>
<li>用于选取应该DOM元素作为Vue实例的挂载目标</li>
<li>只有挂载元素内部才会被Vue进行处理，外部为普通HTML元素</li>
<li>代表MVVM中的View层(视图)</li>
</ul>

可以选择 css 选择器格式的字符串或 HtmlElement 实例，但不能为 html 或 body:<br/>

```js
const app = document.querySelector("#app");
const vm = new Vue({
  //el: '#app'
  el: app,
});
```

挂载完毕后，可以通过 vm.$el 进行访问:

```js
const vm = new Vue({
  el: "#app",
});
console.log(vm.$el);
```

未设置 el 的 vue 实例，也可以通过 vm.$mount()进行挂载，参数形式与 el 规则相同:

```js
const vm = new Vue({});
vm.$mount("#app");
```

#### 插值表达式

挂载元素可以使用 Vue.js 的模板语法，模板中可以通过插值表达式为元素进行动态内容设置，写法为{{}}:

```html
<div id="app">
  <ul>
    <li>计算结果为:{{ 1 + 2 + 3}}</li>
    <li>比较结果为:{{2 > 1 ? 2 : 1}}</li>
  </ul>
</div>
```

注意:
插值表达式只能书写在标签内容区域，可以与其他内容混合; 内部只能书写 Javascript 表达式，不能书写语句。

#### data 语句

用于存储 Vue 实例需要使用的数据，值为对象类型。

```js
new Vue({
  el: "#app",
  data: {
    title: "xxx",
  },
});
```

data 中的数据可以通过<code>vm.$data.属性名</code>或<code>vm.属性名</code>访问。

```js
console.log(vm.$data.title); // output 'xxx'
```

<ul>
<li>data中的数据可以直接在视图中通过插值表达式访问</li>
<li>data中的数据为响应式数据，在发生改变时，视图会自动更新</li>
</ul>

```html
<div id="app">
  <p>{{title}}</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    title: "xxx",
  },
});
vm.title = "yyy";
```

data 中存在数组时，索引操作与 length 操作无法自动更新视图，这时可以借助 Vue.set()方法替代操作。

```js
const vm = new Vue({
  el: "#app",
  data: {
    contentArr: ["content1", "content2", "content3"],
  },
});

Vue.set(vm.contentArr, 0, "new content");
```

#### methods 选项

methods 是一个对象，用于存储需要在 Vue 实例中使用的函数

```html
<div id="app">
  <p>{{fn(value1)}}</p>
  <p>{{fn(value2)}}</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    value1: "a-b-c",
    value2: "e-f-g",
  },
  methods: {
    fn(value) {
      return value.split("-").join("");
    },
  },
});
```

<ul>
<li>methods中的方法可以通过vm.方法名访问</li>
<li>方法中的this为vm实例，可以便携地访问vm数据等功能</li>
</ul>

```js
const vm = new Vue({
  el: "#app",
  data: {
    title: "xxx",
  },
  methods: {
    output() {
      //this.fn();
      console.log("title:", this.title);
    },
    fn() {
      // pass
    },
  },
});
```

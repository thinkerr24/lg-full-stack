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

## Vue.js 指令(Directives)

指令的本质就是 HTML 自定义属性
Vue.js 的指令就是以<code>v-</code>开头的自定义属性

### 内容处理

<ul>
<li>v-once</li>
<li>v-text</li>
<li>v-hmtl</li>
</ul>

###### v-once 指令

使元素内部的插值表达式只生效一次。

```html
<div id="app">
  <p>此内容会随数据自动更改: {{content}}</p>
  <p v-once>此内容不会随数据自动更改: {{content}}</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    content: "init content",
  },
});
```

###### v-text 指令

元素内容整体替换为指定纯文本数据，如果有原始文本也会被替换。

```html
<div id="app">
  <p v-text="content">这段内容会被覆盖</p>
</div>
```

###### v-html 指令

元素内容整体替换为指定的 html 文本(也会覆盖原始内容)

```html
<div id="app">
  <p v-html="content">这段内容会被覆盖</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    content: "<span>new content</span>",
  },
});
```

#### 属性绑定

<ul>
<li>v-bind绑定</li>
<li>Class绑定</li>
<li>Style绑定</li>
</ul>

##### v-bind 指令

v-bind 指令用于动态绑定 HTML 属性

```html
<div id="app">
  <p v-bind:title="title">标签内容</p>
  <!--简写形式-->
  <p :title="title">标签内容</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    title: "这是title属性内容",
  },
});
```

```html
<!--result:-->
<p title="这是title属性内容">标签内容</p>
```

与插值表达式类似，v-bind 中也允许使用表达式

```html
<div id="app">
  <p :class="'demo' + 3">标签内容</p>
  <p :class="prefix + num"></p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    prefix: "demo",
    num: 5,
  },
});
```

如果需要一次绑定多个属性，还可以绑定对象

```html
<div id="app">
  <p v-bind="attrObj">p标签的内容</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    attrObj: {
      id: "box",
      title: "box-title",
      class: "item-box",
      "data-title": "这是data-title的内容",
    },
  },
});
```

##### Class 绑定

class 是 HTML 属性，可以通过 v-bind 进行绑定，并且可以与 class 属性共存。

```html
<div id="app">
  <p v-bind:class="cls">标签内容1</p>
  <p class="a" :class="cls">标签内容2</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    cls: "x",
  },
});
```

对于 class 绑定，Vue.js 中还提供了特殊处理方式<br/>
ex1:

```html
<div id="app">
  <p :class="{b: isB, c: isC, 'class-d': true}"></p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    isB: true,
    isC: false,
  },
});
```

```html
<!--result-->
<p class="b class-d"></p>
```

ex2:

```html
<div id="app">
  <p :class="['a', {b: isB}, 'c']"></p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    isB: true,
});
```

```html
<!--result-->
<p class="a b c"></p>
```

##### Style 绑定

style 是 HTML 属性，可以通过 v-bind 进行绑定，并且可以与 style 属性共存。

```html
<div id="app">
  <p :style="styleObj">style绑定标签内容1</p>
  <p style="color: blue" :style="styleObj">style绑定标签内容2</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    styleObj: {
      width: "200px",
      height: "100px",
      border: "1px solid #ccc",
    },
  },
});
```

当我们希望给元素绑定多个样式对象时，可以设置成数组，可用于公共样式

```html
<div id="app">
  <p :style="[styleObj1, styleObj2]">style绑定标签内容3-数组绑定</p>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    styleObj1: {
      height: "100px",
      width: "200px",
    },
    styleObj2: {
      color: "red",
      border: "1px solid #ccc",
    },
  },
});
```

#### 渲染指令

<ul>
<li>v-for</li>
<li>v-show</li>
<li>v-if</li>
</ul>

##### v-for

v-for 指令用于遍历数据渲染结构，常用的数组与对象均可遍历:

```html
<div id="root">
  <ul>
    <li v-for="item in arr">{{item}}</li>
  </ul>
  <ul>
    <li v-for="value in obj">{{value}}</li>
  </ul>
</div>
```

```js
new Vue({
  el: "#app",
  data: {
    arr: ["content1", "content2", "content3"],
    obj: {
      content1: "内容1",
      content2: "内容2",
      content3: "内容3",
    },
  },
});
```

使用 v-for 指令的同时，应始终指定<b>唯一</b>的 key 属性，可以提高渲染性能并避免问题。

```html
<div id="app">
  <ul>
    <li v-for="item in items" :key="item.id">{{item.value}}</li>
  </ul>
</div>
```

通过<template>标签设置模板占位符，可以将部分元素或内容作为整体进行操作。

```html
<div id="app">
  <template v-for="item in items">
    <span>标签内容1</span>
    <span>标签内容2</span>
  </template>
</div>
```

##### v-show

用于控制元素显示与隐藏，适用于显示隐藏频繁切换时使用
note: <template>无法使用 v-show 指令，因为 v-show 底层是通过改变 display 是否为 none 来 hide 元素的，因为 template 不是真实 dom 元素。

```html
<div id="app">
  <p v-show="true">这个元素会显示</p>
  <p v-show="false">这个元素不会显示</p>
</div>
```

##### v-if

用于根据条件控制元素的创建与移除。和 v-show 区别

```html
<div id="app">
  <p v-if="false">这个元素不会创建</p>
  <p v-else-if="true">这个元素会创建</p>
  <p v-else>这个元素不会创建</p>
</div>
```

note:

<ul>
<li>给使用v-if的同类型元素绑定不同的key</li>
<li>出于性能考虑，应避免将v-if与v-for(优先级更高)应用于同一标签</li>
</ul>

#### 事件处理

v-on 指令，用于进行元素的事件绑定

```html
<div id="app">
  <p>{{content}}</p>
  <button v-on:click="content='新 content'">改变内容</button>
  <button @click="content='new content'">按钮</button>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    content: "默认内容",
  },
});
```

事件程序代码较多时，可以在 methods 中设置函数，并设置为事件处理程序。<br/>
设置事件处理程序后，可以从参数中接收事件对象。

```js
const vm = new Vue({
  el: "#app",
  data: {
    content: "默认内容",
  },
  methods: {
    fn(event) {
      console.log(event);
    },
  },
});
```

在视图中可以通过$event 访问事件对象。

```html
<div id="app">
  <p>{{content}}</p>
  <button @click="fn(content, $event)">按钮</button>
</div>
```

#### 表达输入绑定

##### v-model 指令，用于给<input>、<textarea>及<select>元素设置双向数据绑定

```html
<div id="app">
  <p>元素内容为:{{value}}</p>
  <input type="text" v-model="value" />
</div>
```

##### 单选按钮的双向数据绑定

v-model 绑定同一个 data

```html
<div id="app">
  <p>radio数据为:{{value3}}</p>
  <input type="radio" id="one" value="1" v-model="value3" />
  <label for="one">选项1</label>
  <input type="radio" id="two" value="2" v-model="value3" />
  <label for="two">选项2</label>
</div>
```

##### 复选框

分为单个和多个选项两种选项，书写方式不同。

```html
<div id="app">
  <p>单个checkbox选中的数据为: {{value4}}</p>
  <input type="checkbox" id="single-cb" value="隐私条例" v-model="value4" />
  <label for="single-cb">选项</label>

  <p>多个checkbox选中的数据为: {{value5}}</p>
  <input
    type="checkbox"
    id="multiple-cb-one"
    value="选项一内容"
    v-model="value5"
  />
  <label for="multiple-cb-one">选项一</label>
  <input
    type="checkbox"
    id="multiple-cb-two"
    value="选项二内容"
    v-model="value5"
  />
  <label for="multiple-cb-two">选项二</label>
</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    value4: false,
    value5: [],
  },
});
```

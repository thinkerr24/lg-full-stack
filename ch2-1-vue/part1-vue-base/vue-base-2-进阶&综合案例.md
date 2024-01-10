## 进阶语法

### 自定义指令

指令用于简化 DOM 操作，相当于对基础 DOM 操作的一种封装

<ul>
<li>自定义全局指令</li>
<li>自定义局部指令</li>
</ul>

#### 自定义全局指令

指的是可以被任意 Vue 实例或组件使用的指令

```js
Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  },
});
```

```html
<div id="app">
  <input type="text" v-focus />
</div>
```

#### 自定义局部指令

指的是可以在当前 Vue 实例或组件内使用的指令 [文档](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

```js
new Vue({
  // ...省略其他代码
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
});
```

```html
<div id="app">
  <input type="text" v-focus />
</div>
```

#### 过滤器

过滤器用于进行文本内容格式化处理 <br/>
过滤器可以在插值表达式和 v-bind 中使用

<ul>
<li>全局过滤器</li>
<li>局部过滤器</li>
</ul>

##### 全局过滤器

可以在任意 Vue 实例中使用

```js
Vue.filter("过滤器名称", function (value) {
  // 逻辑代码
  return "处理结果";
});
```

过滤器能在插值表达式和 v-bind 中使用，通过管道符|连接数据

```html
<div id="app">
  <!-- v-bind中使用 -->
  <div v-bind:id="id|filterId"></div>
  <!--在插值表达式中-->
  <div>{{content | filterContent}}</div>
</div>
```

可以将一个数据传入到多个过滤器中进行处理

```html
<div id="app">
  <div>{{content | filterA | filterB}}</div>
</div>
```

一个过滤器可以传入多个参数

```html
<div id="app">
  <!-- filterContent实参为 content, part1, part2-->
  <div>{{content | filterContent(part1, part2)}}</div>
</div>
```

##### 局部过滤器

局部过滤器只能在当前 Vue 实例中使用

```js
new Vue({
  // ...省略其他代码
  filters: {
    ["filterName"]: function (value) {
      // 逻辑代码
      return "result";
    },
  },
});
```

局部过滤器和全局过滤器重名，局部过滤器有效

##### 计算属性

在 Vue.js 的视图中不建议书写复杂逻辑，这样不利于维护。

```html
<div id="app">
  <p>{{Math.max.apply(null, arr)}}</p>
  <p>{{Math.max.apply(null, arr)}}</p>
  <p>{{Math.max.apply(null, arr)}}</p>
</div>
```

封装函数是很好的方式，但有时重复的计算会消耗不必要的性能。

```js
const vm = new Vue({
  el: "#app",
  data: {
    arr: [1, 2, 3, 4, 5, 6],
  },
  methods: {
    getSum() {
      return this.arr.reduce((pre, cur) => pre + cur);
    },
  },
});
```

```html
<div id="app">
  <p>{{getSum()}}</p>
  <p>{{getSum()}}</p>
  <p>{{getSum()}}</p>
</div>
```

如何去提高执行效率? 使用计算属性-使用时为属性形式，访问时会自动执行对应函数

```js
const vm = new Vue({
  el: "#app",
  data: {
    arr: [1, 2, 3, 4, 5, 6],
  },
  computed: {
    result() {
      return this.arr.reduce((pre, cur) => pre + cur);
    },
  },
});
```

```html
<div id="app">
  <p>{{result}}</p>
  <p>{{result}}</p>
  <p>{{result}}</p>
</div>
```

methods 与 computed 区别

<ul>
<li>computed具有缓存性，methods没有</li>
<li>computed通过属性名访问，methods需要调用</li>
<li>computed仅适用于计算操作</li>
</ul>

###### 计算属性练习

准备一个数组，根据数组数据创建列表(当数据大于 10 时创建 li，否则不创建)

思考以下三种方式

<ul>
<li>v-if & v-for(不推荐)</li>
<li>v-for & methods(单次调用适合)</li>
<li>v-for & computed(多次调用适合)</li>
</ul>

###### 计算属性的 setter

计算属性默认只有 getter，Vue.js 也允许给计算属性设置 setter

```js
const vm = new Vue({
  computed: {
    getResult: {
      // getter
      get: function () {
        // 逻辑代码
      },
      // setter
      set: function (newValue) {
        // 逻辑代码
      },
    },
  },
});
```

##### 侦听器

侦听器用于监听数据变化并执行指定操作

```js
new Vue({
  el: "#app",
  data: {
    value: "",
  },
  watch: {
    value(newValue, oldValue) {
      // 逻辑代码
    },
  },
});
```

为了监听对象内部值的变化，需要将 watch 书写为对象，并设置选项 deep:true, 这时通过 handler 设置处理函数。

```js
new Vue({
  el: "#app",
  data: {
    obj: {
      content1: "内容1",
      content2: "内容2",
    },
  },
  watch: {
    obj: {
      deep: true,
      handler(val, oldVal) {
        console.log(val, oldVal);
      },
    },
  },
});
```

注意:

<ul>
<li>当更改(非替换)数组或对象时，回调函数中的新值与旧值相同，因为它们的引用都指向同一个数组，对象
</li>
<li>数组操作不要使用索引与length，无法触发侦听器函数</li>
</ul>

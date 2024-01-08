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

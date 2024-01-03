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

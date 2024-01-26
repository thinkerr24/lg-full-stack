## Vue.js 组件

组件用于封装页面的部分功能，将功能的结构、样式、逻辑代码封装为整体。<br/>
组件使用时为自定义 HTML 标签形式，通过组件名作为自定义标签名。

```html
<div id="#app">
  <!--普通HTML标签-->
  <p>p标签内容</p>
  <!-- Vue.js组件 -->
  <my-com></my-com>
</div>
```

<ul>
<li>组件注册</li>
<li>组件通信</li>
<li>组件插槽</li>
<li>内置组件</li>
</ul>

#### 组件注册

<ul>
<li>全局注册</li>
<li>组件基础</li>
<li>局部注册</li>
</ul>

##### 全局注册

全局注册的组件在注册后可用于任意实例或组件中。

```js
Vue.component("组件名", {
  /*选项对象 */
});
```

注意:全局注册必须设置在根 Vue 实例创建之前。

#### 组件基础

本质上，组件是可复用的 Vue 实例，所以它们可与 new Vue 接收相同的选项，例如 data、methods 以及生命周期钩子等。

<ul>
<li>组件命名规则</li>
<li>template选项</li>
<li>data选项</li>
</ul>

两种命名规则:
kebab-case: 'my-component'<br/>
PascalCase: 'MyComponent' <br/>

```js
Vue.component("my-component-a", {
  /**选项对象 */
});
Vue.component("MyComponentB", {
  /**选项对象 */
});
```

注意:无论采用哪种命名方式，在 DOM 中都只有 kebab-case 可以使用 <br/>

template 选项用于设置组件的结构，最终被引入根实例或其他组件中;<br/>
模板中可以使用插值表达式，和之前在根实例视图结构中使用一致;<br/>
和 React 组件类似，template 选项只能有一个根元素。<br/><br/>

data 选项用于存储组件的数据，与根实例不同，组件的 data 选项必须为函数，数据设置在返回值对象中。

```js
Vue.component("my-component-with-data", {
  template: `<div>
  {{title}}
  </div>`,
  data() {
    return {
      title: "hello, vue2 component",
    };
  },
});
```

为啥 data 是 function 而不是 object?
这种实现方式是为了确保每个组件实例可以一份被返回对象的独立拷贝，不会相互影响。

注意不要用单标签，不然后面的组件不会 render:

```js
 <my-global-componet></my-global-componet>
  <my-component/>
  <!-- my-component-with-data will not render -->
  <my-component-with-data></my-component-with-data>
```

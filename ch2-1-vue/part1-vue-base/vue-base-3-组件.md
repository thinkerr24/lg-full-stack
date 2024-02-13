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

##### 局部注册

局部注册的组件只能用在当前实例或组件中

```js
new Vue({
  //...
  components: {
    "my-component-a": {
      template: "<h3>{{title}}</h3>",
      data() {
        return { title: "a组件示例内容" };
      },
    },
    "my-component-b": {
      template: "<div>{{title}}</div>",
      data() {
        return { title: "b组件示例内容" };
      },
    },
  },
});
```

单独配置组件的选项对象:

```js
const MyComponentA = {
  /**... */
};
const MyComponentB = {
  /**... */
};
new Vue(
  'my-component-a': MyComponentA,
  MyComponentB,

).$mount("#app");
```

#### 组件通信

子组件如何获取父组件中的数据<br/>
对于组件间传递数据的操作，称为组件通信。

<ul>
<li>父组件向子组件传值</li>
<li>子组件向父组件传值</li>
<li>非父子组件传值</li>
</ul>

##### 父组件向子组件传值

通过子组件的 props 选项接收父组件的传值

```js
Vue.component("my-component", {
  props: ["title"],
  template: "<h2>{{title}}</h2>",
});
```

父组件设置方式如下:

```html
<div id="app">
  <my-component-a title="示例内容1"></my-component-a>
  <my-component-a :title="'示例内容2'"></my-component-a>
  <my-component-a :title="item.title"></my-component-a>
</div>
```

###### Props 命名规则

建议 prop 命名使用 camelCase，父组件绑定时使用 kebab-case

```js
Vue.component("my-component", {
  props: ["myTitle"],
  template: `<div>{{myTitle}}</div>`,
});
```

```html
<div id="app">
  <my-component my-title="示例内容1"></my-component>
  <my-component :my-title="'示例内容2'"></my-component>
  <my-component :my-title="item.title"></my-component>
</div>
```

> note: key 属性没办法在子组件中获取，它是 vue 保留字，是提高渲染效率用的。

###### 单向数据流

父子组件间的所有 prop 都是单向下行绑定的; 父组件的 prop 改变会影响子组件，反之不然<br/>
如果子组件要处理 prop 数据，应当存储在 data 中后操作。

```js
Vue.component("my-component", {
  props: ["initialTitle"],
  template: "<h3>{{myTitle}}</h3>",
  data() {
    return {
      myTitle: this.initialTitle,
    };
  },
});
```

> note: 如果 prop 为数组或者对象时，子组件操作将会影响到父组件的状态。

###### Props 类型

Prop 可以设置类型检查，这是需要将 props 更改为一个带有验证需求的对象，并指定对应类型。

```js
Vue.component("MyCOmponentA", {
  props: {
    parStr: String,
    parArr: Array,
    parAny: null, // parAny: undefined
  },
  template: `<div>
    {{parStr}}
    {{parArr}}
    {{parAny}}
  </div>`,
});
```

```js
new Vue({
  el: "#app",
  data: {
    str: "示例内容",
    arr: [1, 2, 3],
    any: "任意类型",
  },
});
```

```html
<div id="app">
  <my-component-a :par-str="str" :par-arr="arr" :par-any="any">
  </my-component-a>
</div>
```

prop 还可以同时指定多个类型，通过数组方式保存即可。

```js
Vue.component("MyComponent", {
  props: {
    parData: [String, Number],
  },
  template: `
  <div>
    {{parData}}
  </div>
  `,
});
```

###### Props 验证

当 prop 需要设置多种规则时，可以将 prop 的值设置为选项对象<br/>
之前的类型检测功能通过 type 选项设置。<br/>
required 用于设置数据为必填项(默认 false)。<br/>
default 用于给可选项指定默认值，当父组件未传递数据时生效。<br/>
当默认值为数组或对象时，必须为工厂函数返回的形式。<br/>
validator 用于给传入的 prop 设置校验函数，return 值为 false 时 Vue.js 会发出警告。验证函数中无法使用实例(this 指向 window)的 data、methods 等功能。

```js
Vue.component("MyComponentA", {
  props: {
    parNum: {
      type: Number,
      required: true,
      default
    },
    parStr: {
      type: Number,
      default: 'string',
      validator(value) {
        return value.startsWith('str');
      }
    },
    parData: {
      type: [String, Boolean],
    },
    parArr: {
      type: Array,
      // default() {
      //   return [1, 2, 3]
      // },
      default: function() {
        return [1, 2, 3]
      }
    }
  },
  template: `<div>
    {{parNum}}
    {{parData}}
  </div>`,
});
```

###### 非 props 属性

当父组件给子组件设置了属性，但此属性在 props 中不存在，这时会自动绑定到子组件的根元素上。

```js
<div id="app">
  <my-component-a
    demo-attr="示例属性"
    title="示例title"
    style="height: 200px"
    class="color-blue"
  ></my-component-a>
</div>
```

如果组件根元素已经存在了对应属性，则会替换组件内部的值。<br/>
class 和 style 是例外，当内外部都设置时，属性会自动合并。

```js
Vue.component("MyComponentA", {
  ineritAttrs: false,
  template: `
    <p title="original title" class="fl" style="width: 200px">SubComponent Content</p>`,
});
```

如果不希望继承父组件设置的属性，可以设置 inheritAttrs: false, 但只适用于普通对象，class&style 不受影响。

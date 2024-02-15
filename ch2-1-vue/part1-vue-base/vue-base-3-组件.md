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

##### 子组件向父组件传值

子组件传值需要通过自定义事件实现<br/>
商品为子组件，购物车为父组件，父组件需要统计商品个数，就需要在子组件个数变化时传值给父组件。

```js
new Vue({
  el: "#app",
  data: {
    products: [
      { id: 1, title: "苹果 * 1斤" },
      { id: 2, title: "橙子 * 2个" },
      { id: 3, title: "香蕉 * 3根" },
    ],
    totalCount: 0,
  },
});
```

```html
<div id="app">
  <h3>购物车</h3>
  <product-item
    v-for="product in products"
    :title="product.title"
    :key="product.id"
  ></product-item>
  <p>总数为:{{totalCount}}</p>
</div>
```

```js
Vue.component("ProductItem", {
  props: ["title"],
  template: `
  <div>
    <span>商品名称:{{title}}, 商品个数:{{count}}</span>
    <button @click="countIns">+1</button>
  </div>
  `,
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    countIns() {
      this.count++;
    },
  },
});
```

子组件数据变化时，通过$emit()触发自定义事件

```js
Vue.component("product-item", {
  //...
  methods: {
    countIns() {
      this.$emit("count-change"); // 自定义事件名称建议使用kebab-case
      this.count++;
    },
  },
});
```

父组件监听子组件的自定义事件，并设置处理程序。

```js
<div id="app">
  ...
<product-item ... @count-change="totalCount++"></product-item>
  ...
</div>
```

###### 自定义事件传值

```js
Vue.component("product-item", {
  props: ["title"],
  template: `<div>
    <span>商品名称</span>
    <button @click="countIns1">+1</button>
    <button @click="countIns5">+5</button>
  </div>`,
  methods: {
    countIns1() {
      this.$emit("count-change", 1);
      this.count++;
    },
    countIns5() {
      this.$emit("count-change", 5);
      this.count += 5;
    },
  },
});
```

父组件在监听事件时需要接收子组件传递的数据。

```html
<div id="app">
  <!-- method1 -->
  <product-item @count-change="totalCount += $event"></product-item>
  <!-- method2 -->
  <product-item @count-change="onCountChange"></product-item>
</div>
```

```js
new Vue({
  //...
  methods: {
    onCountChange(productCount) {
      this.totalCount += productCount;
    },
  },
});
```

###### 组件与 v-model

v-model 用于组件时，需要通过 props 与自定义事件实现。

```html
<div id="app">
  <p>输入内容为:{{iptValue}}</p>
  <com-input v-model="iptValue"></com-input>
</div>
```

```js
new Vue({
  el: "app",
  data: {
    iptValue: "",
  },
  components: {
    ComInput,
  },
});
```

v-model 用于组件时，需要通过 props 与自定义事件实现。

```js
const ComInput = {
  props: ["value"],
  template: `<input type='text' :value="value" 
  @input="$emit('input', $event.target.value)"
  />`,
};
```

##### 非父组件传值

非父子组件指的是兄弟组件或完全无关的两个组件。

<ul>
<li>兄弟组件传值</li>
<li>EventBus</li>
<li>其他传值方式</li>
</ul>

##### 兄弟组件传值

兄弟组件可以通过父组件进行数据中转

```js
new Vue({
  el: "#app",
  data: {
    value: "",
  },
});
```

```html
<div id="app">
  <com-a @value-change="value = $event"></com-a>
  <com-b :value="value"></com-b>
</div>
```

```js
Vue.component("ComA", {
  template: `<div>
    ComponentA Content:{{ value }}
    <button @click="$emit('value-change', value)">Send</button>
  </div>`,
  data() {
    return { value: "示例内容" };
  },
});
```

```js
Vue.component("ComB", {
  props: ["value"],
  template: `<div>
    ComponentB received Content:{{ value }}
  </div>`,
});
```

##### EventBus

当组件嵌套关系复杂时，根据组件关系传值会比较繁琐。<br/>
组件为了数据中转，data 中会存在许多与当前组件功能无关的数据。

<ul>
<li>EventBus(事件总线)是一个独立的事件中心，用于管理不同组件间的传值操作</li>
<li>EventBus通过一个新的Vue实例来管理组件传值操作，组件通过给实例注册事件、调用事件来实现数据传递</li>
</ul>

```js
// EventBus.js
const bus = new Vue();
```

发送数据的组件触发 bus 事件，接收的组件给 bus 注册对应事件。

```js
Vue.component("product-item", {
  template: `
    <div>
    <span>商品名称: 苹果，商品个数: {{count}}</span>
    <button @click="countIns">+1</button>
    </div>
  `,
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    countIns() {
      bus.$emit("countChange", 1);
      this.count++;
    },
  },
});
```

给 bus 注册对应事件通过$on()操作

```js
Vue.component("product-total", {
  template: `<p>总个数为: {{totalCount}}</p>`,
  data() {
    return { totalCount: 0 };
  },
  created() {
    bus.$on("countChange", (productCount) => {
      this.totalCount += productCount;
    });
  },
});
```

##### 其他通信方式(一般情况下不推荐)

<ul>
<li>$root</li>
<li>$refs</li>
</ul>

###### $root

\$root 用于访问当前组件树的根实例，设置简单的 Vue 应用时可以通过此方式进行组件传值 <br/>

```html
<div id="app">
  <p>父组件数据: {{count}}</p>
  <com-a></com-a>
  <com-b></com-b>
</div>
```

```js
const ComA = {
  template: `
  <div>
    组件A: {{$root.count}}
    <button @click="clickFn">+1</button>
  </div>
  `,
  methods: {
    clickFn() {
      this.$root.count++;
    },
  },
};

const ComB = {
  template: `
  <div>
    组件B: {{$root.count}}
    <button @click="clickFn">+1</button>
  </div>
  `,
  methods: {
    clickFn() {
      this.$root.count++;
    },
  },
};

new Vue({
  el: "#app",
  data: {
    count: 0,
  },
  components: {
    ComA,
    ComB,
  },
});
```

除了\$root, Vue.js 中还提供了 [\$parent](https://v2.cn.vuejs.org/v2/api/#vm-children) 与[\$children](https://v2.cn.vuejs.org/v2/api/#vm-children) 用于便捷访问父子组件。

###### $refs

$refs 用于获取设置了 ref 属性的 HTML 标签或子组件。<br/>
给普通的HTML标签设置ref属性，$refs 可以获取 DOM 对象

```html
<div id="app">
  <input type="text" ref="inp" />
  <button @click="fn">按钮</button>
</div>
```

```js
new Vue({
  el: "#app",
  methods: {
    fn() {
      this.$refs.inp.focus();
    },
  },
});
```

给子组件设置 ref 属性，渲染后可通过$refs 获取子组件实例。

```html
<div id="app">
  <com-a ref="comA"></com-a>
</div>
```

```js
const ComC = {
  template: `<p>组件C:{{value}}</p>`;
  data: {
    value: '这是组件C的数据'
  }
};

new Vue({
  el: "#app",
  components: {
    ComC,
  },
  mounted() {
    console.log(this.$refs);
    this.$refs.comC.value = "修改子组件数据";
  },
});
```

### 组件插槽

组件插槽可以便捷的设置组件内容

```html
<div id="app">
  <com-a>
    示例内容
    <span>组件的主体内容</span>
  </com-a>
</div>
```

<ul>
<li>单个插槽</li>
<li>具名插槽</li>
<li>作用域插槽</li>
</ul>

#### 单个插槽

如果我们希望组件标签可以像 HTML 标签一样设置内容，那么组件的使用灵活度会很高。

```HTML
<div id="app">
<p>示例内容1</p>
<com-a>示例内容2</com-a>
</div>
```

但平时我们书写的组件，组件首尾标签中书写的内容会被抛弃。

```html
<div id="app">
  <com-a></com-a>
</div>
```

我们需要通过<slot>进行插槽设置。

```js
Vue.component("com-a", {
  template: `<div>
  <h3>组件标题</h3>
  <slot></slot>
  </div>`,
});
```

```html
<div id="app">
  <com-a>
    示例内容
    <span>组件的主体内容</span>
  </com-a>
</div>
```

需要注意模板内容的渲染位置:

```html
<div id="app">
  <com-a> 这里只能访问父组件的数据 {{parValue}} </com-a>
</div>
```

```js
const ComA = {
  template: `
  <div>
    <p>组件A:</p>
    <slot></slot>
  </div>
  `
  data: {
      value: '子组件的数据'
    }
  }
};
new Vue({
  el: "#app",
  data: { parValue: "父组件数据" },
  components: {
    ComA,
  },
});
```

我们可以在<slot>中为插槽设置默认值，也称为后备内容。

```js
const ComA = {
...
template: `<div>
  <p>组件A:</p>
  <slot>这是默认文本</slot>
</div>`
...
}
```

```html
<div id="app">
  <com-a></com-a>
</div>
```

#### 具名插槽

如果组件中多个位置需要设置插槽，据需要给<slot>设置 name(没有 name 属性的 slot 默认 name 为 default)，称为具名插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main><slot></slot></main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<com-a>
  <template v-slot:header>
    <h1>组件头部内容</h1>
  </template>

  <template v-slot:default>
    <p>组件主体内容第一段</p>
    <p>组件主体内容第二段</p>
  </template>
  <!-- default slot可以不要template标签，直接简写为内部的内容:
  <p>组件主体内容第一段</p>
    <p>组件主体内容第二段</p>
  -->

  <!-- 将"v-slot:"简写为'#'-->
  <template #footer>
    <p>组件底部内容</p>
  </template>
</com-a>
```

#### 作用域插槽

用于让插槽可以使用子组件的数据<br/>
组件将需要被插槽使用的数据通过 v-bind 绑定给`<slot>`，这种用于给插槽传递数据的属性称为插槽 prop

```js
const ComD = {
  template: `
  <div>
  <p>组件D:</p>
  <slot :value="value">这是默认文本</slot>
  </div>
  `,
  data() {
    return {
      value: "子组件数据",
    };
  },
};
```

```HTML
<div id="app">
<com-d>
  <template v-slot:default="dataObj">
    {{dataObj.value}}
  </template>
</com-d>
</div>
```

如果<b>只</b>存在默认插槽，同时又需要接收数据，可以进行简写:

```html
<div id="app">
  <!-- <com-d v-slot:default="dataObj">{{dataObj}}</com-d> -->
  <!--进一步简写-->
  <!-- <com-d v-slot="dataObj">{{dataObj.value}}</com-d> -->
  <!--进一步简写-->
  <com-d #default="dataObj">{{dataObj.value}}</com-d>
</div>
```

还可以通过 ES6 的解构操作进行数据接收

```HTML
<div id="app">
<com-d>
  <template v-slot:default="{value}">
    {{value}}
  </template>
</com-d>
</div>
```

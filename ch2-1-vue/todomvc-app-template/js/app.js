(function (window) {
	"use strict";

	// 声明对象存储所有用于进行事项筛选的函数
	const filters = {
		all(todos) {
			return todos;
		},
		active(todos) {
			return todos.filter((todo) => !todo.completed);
		},
		completed(todos) {
			return todos.filter((todo) => todo.completed);
		},
	};

	// Your starting point. Enjoy the ride!
	const vm = new Vue({
		el: "#app",
		data: {
			// todos用于存储所有事项信息
			todos: [
				{ id: 1, title: "示例内容1", completed: true },
				{ id: 2, title: "示例内容2", completed: false },
				{ id: 3, title: "示例内容3", completed: false },
			],
			// 存储新增输入框数据
			newTodo: "",
			// 正在编辑的todo
			editingTodo: {},
			// 存储正在编辑todo的原始title
			titleBeforeEdit: "",
			dataType: "all",
		},
		methods: {
			pluralize(word) {
				return word + (this.remaining === 1 ? "" : "s");
			},
			// 用于新增事项
			addTodo() {
				const value = this.newTodo.trim();
				if (!value) {
					return;
				}
				this.todos.push({
					id: this.todos.length + 1,
					title: value,
					completed: false,
				});
				this.newTodo = "";
			},
			// 删除单个事项
			removeTodo(id) {
				this.todos = this.todos.filter((cto) => cto.id !== id);
			},
			// 删除已完成事项
			removeCompleted() {
				// this.todos = this.todos.filter((todo) => !todo.completed);
				// 加上filter后
				this.todos = filters.active(this.todos);
			},
			// 编辑双击的事项
			editTodo(todo) {
				this.editingTodo = todo;
				this.titleBeforeEdit = todo.title;
			},
			// 用于取消编辑，还原状态与内容
			cancelEdit(todo) {
				this.editingTodo = {};
				todo.title = this.titleBeforeEdit;
			},
			// 用于保存编辑
			editDone(todo) {
				this.editingTodo = {};
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo.id);
				}
			},
		},
		computed: {
			// 用于进行事项筛选处理
			filteredTodo() {
				return filters[this.dataType](this.todos);
			},
			remaining() {
				// return this.todos.filter((todo) => !todo.completed).length;
				// 加上filter后
				return filters.active(this.todos).length;
			},
			allDone: {
				get() {
					return this.remaining === 0;
				},
				set(value) {
					this.todos.forEach((todo) => (todo.completed = value));
				},
			},
		},
		directives: {
			// 用于设置正在编辑的事项输入框获取焦点
			"todo-focus"(el, binding) {
				//console.log(binding.value);
				if (binding.value) {
					el.focus();
				}
			},
		},
	});
})(window);

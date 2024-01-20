(function (window) {
	"use strict";

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
				this.todos = this.todos.filter((todo) => !todo.completed);
			},
		},
		computed: {
			remaining() {
				return this.todos.filter((todo) => !todo.completed).length;
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
	});
})(window);

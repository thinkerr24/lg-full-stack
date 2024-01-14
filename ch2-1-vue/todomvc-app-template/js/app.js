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
		},
	});
})(window);

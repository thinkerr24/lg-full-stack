const context = {
  // method 0
  //   get method() {
  //     return this.request.method;
  //   },
};

defineProperty("request", "method");
defineProperty("request", "url");

defineProperty("response", "body");

function defineProperty(target, name) {
  // method2
  //   context.__defineGetter__(name, function () {
  //     return this[target][name];
  //   });
  // method 1
  Object.defineProperty(context, name, {
    get() {
      return this[target][name];
    },
    set(value) {
      this[target][name] = value;
    },
  });
}

module.exports = context;

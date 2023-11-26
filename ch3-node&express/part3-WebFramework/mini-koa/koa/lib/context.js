const context = {
  // method 0
  //   get method() {
  //     return this.request.method;
  //   },
};

defineProperty("request", "method");
defineProperty("request", "url");

function defineProperty(target, name) {
  context.__defineGetter__(name, function () {
    return this[target][name];
  });
  // method 1
  //   Object.defineProperty(context, name, {
  //     get() {
  //       return this[target][name];
  //     },
  //   });
}

module.exports = context;

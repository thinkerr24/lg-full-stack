const PENDING = "pending"; // 等待
const FULFILLED = "fulfilled"; // 成功
const REJECTED = "rejectd"; // 失败

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;

  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status === PENDING) {
      // 将状态更改为成功
      this.status = FULFILLED;
      this.value = value;
    }
    // 保存成功之后的值

  };

  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status === PENDING) {
      // 将状态更改为失败
      this.status = REJECTED;
      this.reason = reason;
    }
     // 保存失败后的原因
  };

  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
        successCallback(this.value);
    }
    if (this.status === REJECTED) {
        failCallback(this.reason);
    }
  }
}

module.exports = MyPromise;

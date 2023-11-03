// ex1
// setTimeout(() => console.log('1'), 0);
// setImmediate(() => console.log('2'));

// // 阻塞主线程3S钟
// (function sleep(delay) {
//     const pre = Date.now();
//     while (Date.now() - pre < delay) {
//         continue;
//     }
//     console.log('delay end...');
// })(3000);
// print 1 2

// ex2 when current: Timers, 1 first execute; when current: Check, 2 first execute
// setTimeout(() => console.log('1'), 0);
// setImmediate(() => console.log('2'));
// print 1 2 or 2 1
// console.time('sto')
// setTimeout(() => {
//     console.timeEnd('sto');
//     console.log('1');
// }, 0);

// ex3 IO/POLL -> Check -> Timers
// const fs = require('fs');
// fs.readFile('./nodejs.md', (err, data) => {
//     setTimeout(() => console.log('1'), 0);
//     setImmediate(() => console.log('2'));
// });
// print 2 1

// ex4 process.nextTick > 宏任务
// setTimeout(() => console.log('1'), 50);
// process.nextTick(() => console.log('2'));
// setImmediate(() => console.log('3'));
// process.nextTick(() => console.log('4'));
// 2 4 3 1

// ex5 sync > nextTick > 微任务 > 宏任务
// setTimeout(() => console.log('1'));
// setImmediate(() => console.log('2'));
// process.nextTick(() => console.log('3'));
// Promise.resolve().then(() => console.log('4'));
// (() => console.log('5'))();
// 5 3 4 1 2

// ex6 微事件队列先进先出
// process.nextTick(() => console.log('1'));
// Promise.resolve().then(() => console.log('2'));
// process.nextTick(() => console.log('3'));
// Promise.resolve().then(() => console.log('4'));
// 1 3 2 4

// ex7
setTimeout(() => console.log("1"), 50);
process.nextTick(() => console.log("2"));
setImmediate(() => console.log("3"));
process.nextTick(() => {
  setTimeout(() => console.log("4"), 1000);
});
// 2 3 1   4
const MyPromise = require('./myPromise');

const p = new MyPromise((resolve, reject) => {
    resolve('success');
    reject('fail');
});

p.then(value => {
    console.log('value:', value);
}, reason => {
    console.log('reason:', reason);
})
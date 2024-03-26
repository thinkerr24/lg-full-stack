const MyPromise = require('./myPromise');

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 2000);
    //reject('fail');
});

p.then(value => {
    console.log('value:', value);
}, reason => {
    console.log('reason:', reason);
})
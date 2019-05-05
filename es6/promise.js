function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then((value) => {
    console.log(value);
});

let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function () {
    console.log('resolved.');
});

console.log('Hi!');


var waitSecond = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000);
});

waitSecond
    .then(function () {
        console.log("Hello");
    })
    .then(function () {
        console.log("Hi");
    });

console.log(2 ** 10);

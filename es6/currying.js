// 函数柯里化实现
function curry(fn, args) {
    const length = fn.length;
    args = args || [];
    return function () {
        newArys = args.concat(Array.prototype.slice.call(arguments));
        if (newArys.length < length) {
            return curry.call(this, fn, newArys);
        } else {
            return fn.apply(this, newArys);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c
}

const multi = curry(multiFn);
console.log(multi(2)(3)(4)); // 24

// es6 方法实现
const curry1 = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length
        ? fn(...arg)
        : curry(fn, arg)
)([...arr, ...args]);

let curryTest = curry1((a, b, c, d) => a + b + c + d);
console.log(curryTest(1, 2, 3)(4)); // 10

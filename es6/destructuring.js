const [, b, c] = [1, 2, 3];

function add(num) {
    if (num <= 0) return;
    num--;
    // console.log(num);
    add(num);
}

add(10);

function f(arg) {
    console.log(...arg)
}

f([1, 2, 3, 4, 5, 6]);

const arr = [1, 2, 3, 5, 4];
// arr === [...arr]  // false
Math.max.apply(null, arr);  //5
Math.max(...arr);  // 5

const arr1 = [1, 3, 5];
const arr2 = [2, 4, 6];

// Array.prototype.push.apply(arr1, arr2);
// arr1.push(...arr2);
// console.log([...arr2, ...arr1]);
console.log([..."hello world !"]);

const obj = {0: 1, 1: 2, 2: 3, length: 3};

console.log(Array.from(obj));
console.log(Array.from([..."hello"])); //[ 'h', 'e', 'l', 'l', 'o' ]

const nameSet = new Set(["a", "b"]);
console.log(Array.from(nameSet)); // [ 'a', 'b' ]

function f1() {
    const arr = [...arguments];
    console.log(arr, 'ans')
}

f1(1, 2, 3, 4, 5);

// const arr4 = [1, 2, [3, [4, 5]]].flat();
// console.log(arr4);

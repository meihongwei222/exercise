// 1、 整数翻转
const revserInteger = integer => parseInt(parseInt(integer).toString().split('').reverse().join('')) * Math.sign(integer);
console.log(revserInteger(121324));

// 2、 出现次数最多的子符
const str = 'aaabbsabsababsa';
const more = [...str].reduce((x, y) => {
    x[y] ? x[y]++ : x[y] = 1;
    return x
}, {});
console.log(more);

// 3、 首字母大写
const str1 = 'hello mei hong wei';
const capitalize = (str) => str.split(' ').map((item) => item[0].toUpperCase() + item.slice(1));
console.log(capitalize(str1));

// 4、 数组分隔
const chunk = (array, size) => {
    let chunks = [];
    let index = 0;
    while (index < array.length) {
        chunks.push(array.slice(index, index + size));
        index += size;
    }
    return chunks;
};
const arr = [1, 2, 3, 4, 5, 6];
console.log(chunk(arr, 9));

// 5、 words 翻转
const str2 = 'i am mei';
const reverseWords = (str) => str.split(' ').map((item) => item.split('').reverse().join('')).join(' ');
console.log(reverseWords(str2));

// 6、 数组分类
let ary = [1, 13, 4, 14, 5, 67, 19, 73, 13, 14, 84, 55, 90];
ary = Array.from(new Set(ary)).sort((a, b) => a - b);
let num = ary.map((item) => Math.floor(item / 10));
num = Array.from(new Set(num));
const newAry = num.map((item) => {
    let arr = [];
    ary.forEach((it, ind) => {
        if (item === Math.floor(ary[ind] / 10)) {
            arr.push(it);
        }
    });
    return arr
});
console.log(newAry); // [ [ 1, 4, 5 ], [ 13, 14, 19 ], [ 55 ], [ 67 ], [ 73 ], [ 84 ], [ 90 ] ]

// 7、 深拷贝
const arr1 = [1, 2, 3, 4, 5, 6, [7, 8, 9]];
const obj4 = {a: 1, b: {c: 2, d: {f: 5}}};
const arr2 = JSON.parse(JSON.stringify(arr1));
console.log(arr2 === arr1);

function deepCopy(obj) {
    let result;
    if (typeof obj === 'object') {
        result = obj.constructor === Array ? [] : {};
        for (let i in obj) {
            result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    } else {
        result = obj;
    }
    return result
}

const arr3 = deepCopy(arr1);
const obj2 = deepCopy(obj4);
console.log(arr3, arr3 === arr1);
console.log(obj2, obj2 === obj4);

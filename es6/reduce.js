const arr = [100, 200, 300];

const add = arr.reduce((x, y) => x + y, 0);
console.log(add);

const result = [
    {
        subject: 'math',
        score: 100
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];

const sum = result.reduce((x, y) => x + y.score, 0);

console.log(sum);

const dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2,
};

var qsum = result.reduce(function (prev, cur) {
    return cur.score * dis[cur.subject] + prev;
}, 0);

console.log(sum, qsum);

const arrString = 'abcdaabc';
const tatal = [...arrString].reduce((x, y) => {
    x[y] ? x[y]++ : x[y] = 1;
    return x;
}, {});
console.log(tatal);

const add1 = [1, 2].reduce((x, y) => {
    x.push(y * 10);
    return x;
}, []);

console.log(add1, 'add1');


function only(obj, arrs) {
    return arrs.reduce((x, y) => {
        x[y] = obj[y];
        return x;
    }, {});
}

var a = {
    env: 'development',
    proxy: false,
    subdomainOffset: 2,
    saga: null,
};
console.log(only(a, ['env', 'proxy', 'saga']));   // {env:'development', proxy : false}


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


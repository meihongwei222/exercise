const map = new Map();
const obj = {a: 1};
map.set(obj, "content");
console.log(map.get(obj));

const set = new Set();
const arr = [1, 2, 2, 3, 4, 4, 6, 6, 5, 5, 4, 5, 5, 5, 5];
const ary = arr.map((item) => set.add(item));
// console.log(Array.from(ary)); // 数组去重

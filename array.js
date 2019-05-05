let ary = [10, 20, 40, 50]
function add (x, y) {
  return x + y
}
function fn (a, b, c, d, f) {
  // console.log(a, b, c, d, f)
}
// fn(-1, ...ary, 2, ...[3])r
// console.log(...[1, 4, 6, 6])
// console.log(Math.max(...ary))
// let arr = [23, 24, 12, [1, 2, 3, 5]].flat(Infinity)
// console.log(arr)
const obj = {a: 10, b: 30}
const o = Object.assign(obj, {c: 90}, {r: 'kkk'})
const arr = [{n: 10}, {n: 20}, {n: 40}]
const total = arr.reduce((x, y) => {
  return x.n + y.n
})
let res = arr.map(item => item.n).reduce((total, num) => total + num)
console.log(res)

let abc = {'0': '111', '1': '222', length: 2}
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
let aa = Array.from(abc, item => item + '哈哈哈')
let bb = Array.from(arrayLike, item => item + item)
console.log(aa, bb)

function doubleAfter2seconds (num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2 * num)
    }, 2000)
  })
}
async function timeout () {
  let first = await doubleAfter2seconds(30)
  let second = await doubleAfter2seconds(50)
  let third = await doubleAfter2seconds(30)
  console.log(first + second + third)
}

console.log(timeout())
console.log('虽然在后面，但是我先执行')
// for (let i = 0; i < 1000000; i++) {
//   console.log(i++)
// }
let obj1 = {a: 1, b: 6, v: 0}
let obj3 = {c: 2}
let obj2 = {...obj1, ...obj3}
console.log(obj2)

var a = [{id: 1}, {id: 3}, {id: 2}, {id: 3}, {id: 1}]
var b = a.reduce((r, x) => {
  return ((r[x.id] || (r[x.id] = [])).push(x), r)
}, {})

// var b = a.reduce(function (initArray, item) {
//   let index = item.productid
//   if (initArray[index]) {
//     initArray[index].push(item)
//   } else {
//     initArray[index] = [item]
//   }
//   return initArray
// }, {})
console.log(b)
var c = Object.keys(b).map(x => b[x])
console.log(c)


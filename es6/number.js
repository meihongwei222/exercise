function distinct(arr) {
    let hash = {};
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        let string = JSON.stringify(arr[i]);
        if (!hash[string]) {
            hash[string] = 1;
            newArray.push(JSON.parse(string))
        }
    }
    return newArray
}

const arr = [123, {a: 1, b: 2}, {b: 2, a: 1}];
console.log(distinct(arr));


var songs = [
    {name: "羽根", artist: "air"},
    {name: "羽根", artist: "air"},
    {name: "晴天", artist: "周杰伦"},
    {name: "晴天", artist: "周杰伦"},
    {artist: "周杰伦", name: "晴天"}
];

function unique(songs) {
    let result = {};
    let finalResult = [];
    for (let i = 0; i < songs.length; i++) {
        result[songs[i].name] = songs[i];
        //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
    }
    //console.log(result);{"羽根":{name:"羽根",artist:"air"},"晴天":{name:"晴天",artist:"周杰伦"}}
    //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
    for (item in result) {
        finalResult.push(result[item]);
    }
    //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
    return finalResult;
}

console.log(unique(songs));

const aa = ['a', 'ee', 'asd', 'bdf', '哈哈', 'zz', 2, 1, 4, 3, 8];
const bb = [];
const cc = [];
aa.forEach(item => {
    typeof item === 'string' ? bb.push(item) : cc.push(item);
});
cc.sort((a, b) => a - b);
bb.sort((a, b) => a.localeCompare(b));
console.log([...cc, ...bb]);

const ary = [1, 2, 3, 4];
const arr1 = [];
const obj = {};
ary.forEach(item => {
    obj.num = item;
    console.log(obj, 'obj');
    arr1.push(obj);
    console.log(arr1, 'arr,arr')
});
console.log(arr1, arr1[0] === arr1[1], 'ooo');

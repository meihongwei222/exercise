function f({x, y = 5} = {}) {
    console.log(x, y);
}

f();

var x = 1;

function f1(x, y = x) {
    console.log(y);
}

f1(2);

const foo = 'outer';

function bar(func = () => foo) {
    const foo = 'inner';
    console.log(func()); // outer
}

bar();

function f3(x, y = () => {
    x = 2
}) {
    var x = 3;
    y();
    console.log(x);
}

f3();

function add(...values) { // 省略了arguments  只能是最后一个参数 length属性不包含rest参数
    console.log(values);  // [ 1, 2, 3, 4, 5, 6, 65 ]
}

add(1, 2, 3, 4, 5, 6, 65);

const cat = {
    lives: 9,
    jumps: () => {
        this.lives--;
        console.log(this) // 指向window对象 所以不适合用箭头函数
    }
};

cat.jumps();

// var button = document.getElementById('press');
// button.addEventListener('click', () => {
//     this.classList.toggle('on');
//     console.log(this); // // 指向window对象 所以不适合用箭头函数
// });


// 双冒号运算
const obj1 = {
    sum: 8898,
};
const obj = {
    sum: 100,
    f2: function () {
        return sum
    }
};

const q = obj1::obj.f2();
console.log(q);


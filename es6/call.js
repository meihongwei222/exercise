// call的实现
Function.prototype.call1 = function (conrtent = window) {
    conrtent.fn = this;
    let args = [...arguments].slice(1);
    let result = conrtent.fn(...args);
    delete conrtent.fn;
    return result;
};

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value, this);
}

bar.call1(foo, 'black', '18'); // black 18 1

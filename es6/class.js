class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    toString() {
        console.log('name:' + this.name + ',color:' + this.color);
    }
}

class Cat extends Animal{
    constructor(cat, color) {
        super(cat, color);
    }
}

const cat = new Cat('cat', 'black');

console.log(cat.color);

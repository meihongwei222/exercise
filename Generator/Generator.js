function* helloWorldGenerator() {
    yield "hello";
    yield "world";
    yield 22 + 44;
    return "ending";
}

const hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

function* f() {
    console.log("srart");
}
const generator = f();
setTimeout(() => {
    console.log(generator.next());
}, 2000);

console.log('\u0061', '\u{20BB7}');

const s = "\u{20BB7}";
console.log(s.length);  // 2

console.log(String.fromCharCode(0x20BB7));

for (let codePoint of "hello world!") {
    // console.log(codePoint);
}

console.log("hello world!".repeat(3)); // repeat 使字符串重复几次

// trim  去掉空格


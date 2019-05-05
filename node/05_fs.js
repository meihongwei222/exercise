let fs = require('fs');
// fs.stat('index.js', (error, stats) => {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(stats);
//         console.log(`文件：${stats.isFile()}`);
//         console.log(`目录：${stats.isDirectory()}`);
//         return false;
//     }
// });
//
// fs.rmdir('css', (err) => {
//     if(err) {
//         console.log(err);
//         return false;
//     } else {
//         console.log("创建目录成功！");
//     }
// });

fs.appendFile('index.js', 'console.log("aaa")', (err) => {
    if(err) {
        console.log(err);
        return false
    } else {
        console.log('写入成功！');
    }
});

// fs.readFile('index.js', (err, data) => {
//     if(err) {
//         console.log(err);
//         return false;
//     } else {
//         console.log("读取文件成功！");
//         console.log(data);
//         // Console：
//         // 读取文件成功！
//         // <Buffer 48 65 6c 6c 6f 20 6a 73 6c 69 61 6e 67 e8 bf 99 e6 ae b5 e6 96 87 e6 9c ac e6 98 af e8 a6 81 e8 bf bd e5 8a a0 e7 9a 84 e5 86 85 e5 ae b9>
//     }
// });
//
// fs.readdir('node', (err, data) => {
//     if(err) {
//         console.log(err);
//         return false;
//     } else {
//         console.log("读取目录成功！");
//         console.log(data);
//         // Console：
//         // 读取目录成功！
//         // [ '03_tool-multiply.js', 'jsliang-module' ]
//     }
// });
//
// fs.rename('aaa.js', 'node/index.js', (err) => {
//     if(err) {
//         console.log(err);
//         return false;
//     } else {
//         console.log("剪切成功！");
//     }
// });

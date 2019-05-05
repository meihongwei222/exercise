var url = require('url');
var http = require('http');

http.createServer(function (req, res) {
    if(req.uri !== '/favicon.ico'){
        // var result = url.parse(req.url, true);
        // console.log(result);
        console.log(url.parse('https://www.baidu.com/new?name:mei'), 'url');
    }
    res.writeHead(200, {
        "Context-Type": "text/html;charset=utf-8"
    });
    res.write('<h1> hello nodeJS ! </h1>');
    res.end();
}).listen(3000);

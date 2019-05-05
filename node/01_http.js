var http = require('http');
http.createServer(function (req, res) {
    res.writeHeader(200, {
        "Content-Typ": "text/html;charset=utf-8"
    });
    res.write("<h1>hello node !</h1>");
    res.end(0)
}).listen(3000);

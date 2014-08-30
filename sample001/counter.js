var http = require("http");

var count = 0;
http.createServer(function(req, res) {
    count++;
    console.log(req.url + " " + count);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end("Hello World\n" + count);
}).listen(12345);

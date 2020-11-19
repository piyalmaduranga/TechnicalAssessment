var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var filename ='./resource/data.json'
    if (req.url == '/result') {
        req.on('data', d => {
            fs.unlinkSync(filename);
            fs.writeFile(filename, d, function (err) {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: "create file successfuly" }));
                res.end();
            });
        })
        req.on('error', error => {
            console.error(error)
        })

    }
});

server.listen(5000);

console.log('Node.js web server at port 5000 is running..')
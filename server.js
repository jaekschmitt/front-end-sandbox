'use strict';

var http    = require("http"),
    url     = require("url"),
    path    = require("path"),
    fs      = require("fs");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {

    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), 'client/', uri);
  
    if (fs.statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');    
    console.log(`Requesting: ${filename}`);    

    fs.exists(filename, (exists) => {
        if(!exists) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not Found\n");
            res.end();
            return;
        }        

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {        
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(err + "\n");
                res.end();
                return;
            }

            res.writeHead(200);
            res.write(file, "binary");
            res.end();
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
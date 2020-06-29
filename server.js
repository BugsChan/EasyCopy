'use strict';
const http = require('http');
const URL = require("url");

const port = 80;
const Cache = require("./Cache").Cache;
const Handle = require("./Handle").Handle;


const getType = (pathname) => {
    const types = {
        ".html": "text/html",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".css": "text/css",
        ".js": "application/x-javascript",
        ".ico": "image/x-icon"
    };
    if (!pathname || pathname == "/")
        return types['.html'];
    let type = pathname.substr(pathname.lastIndexOf("."));
    type = type.toLowerCase();
    return types[type];
};



http.createServer(function (req, res) {
    let url = URL.parse(req.url);
    let pathname = url.pathname;
    try {
        if (pathname.indexOf(".") > 0 || pathname == '/') {
            res.writeHead(200, { 'Content-Type': getType(pathname) });
            Cache.createInstance().getFile(pathname, (err, data) => {
                if (err) {
                    res.write("<h1>Error - Can't find this file</h1>");
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else if (pathname == "/io") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            Handle(req, res);
        } else {
            throw new Exception("404");
        }
    } catch (e) {
        console.log(e);
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end();
    }
}).listen(port);




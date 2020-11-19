'use strict';
const express = require("express");
const app = express();

app.use("/", express.static("WebSource"));

const Handle = require("./Handle").Handle;
app.use("/io", Handle);

const ipget = require("./IP_Get").IPGET;
app.use("/ip", ipget);

app.listen(80);

//防止异常引起自动关闭
process.on('uncaughtException', function (err) {
    console.log(err);
});
/**

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

*/
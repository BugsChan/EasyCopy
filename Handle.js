
const URL = require("url");
const fs = require("fs");

const UUID = () => {
    let s = "";
    const hexDigit = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 36; i++) {
        s += hexDigit[parseInt(Math.random() * hexDigit.length)];
    }
    return s;
};

const getParams = (query) => {
    let ans = {};
    query = query.split("&");
    for (let i = 0; i < query.length; i++) {
        let tmp = query[i].split("=");
        ans[tmp[0]] = tmp[1];
    }
    return ans;
};

let Storage = {};

const Handle = (req, res) => {
    //´¦Àí
    let params = getParams(URL.parse(req.url).query);
    let uuid = null;
    switch (params["m"]) {
        case "upload":
            uuid = params["uuid"] || UUID();
            req.setEncoding("utf8");
            req.addListener('data', (data) => {
                console.log("data:", data);
                Storage[uuid] = data;
                res.write(uuid);
                res.end();
            });
            break;

        case 'downLoad':
            uuid = params["uuid"];
            if (uuid in Storage) {
                res.write(Storage[uuid]);
                delete Storage[uuid];
                res.end();
            } else {
                res.write("Error");
                res.end();
            }
            break;
    }
};

module.exports = {
    Handle: Handle
};
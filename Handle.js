
const URL = require("url");

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
let timeOut = {};
let autoClearStarted = false;

const AutoClear = (uuid) => {
    timeOut[uuid] = 150;
    if (!autoClearStarted) {
        autoClearStarted = true;
        setInterval(() => {
            for (let each in timeOut) {
                if (timeOut[each] <= 0) {
                    delete Storage[each];
                    delete timeOut[each];
                } else {
                    timeOut[each] -= 10;
                }
            }
        }, 10000);
    }
};

const Handle = (req, res) => {
    //����
    let params = getParams(URL.parse(req.url).query);
    let uuid = null;
    switch (params["m"]) {
        case "upload":
            uuid = params["uuid"] || UUID();
            req.setEncoding("utf8");
            req.addListener('data', (data) => {
                Storage[uuid] = data;
                AutoClear(uuid);
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
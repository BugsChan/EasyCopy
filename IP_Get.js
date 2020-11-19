const os = require("os");
const GetIp = () => {
    const interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === "IPv4"
                && alias.address != "127.0.0.1"
                && !alias.internal) {
                return alias.address;
            }
        }
    }
};

const IP_GET = (req, res) => {
    res.write(GetIp());
    res.end();
};

module.exports = {
    IPGET: IP_GET
}
const os = require("os");

//family == "IPv4" || "IPv6"
const GetIp = (family) => {
    const interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === family
                && alias.address != "127.0.0.1"
                && alias.address != "::1"
                && !alias.internal) {
                return alias.address;
            }
        }
    }
};

const IP_GET = (req, res) => {
    let family = req.query.family;
    switch (family) {
        case "4":
            family = "IPv4";
            break;
        case "IPv6":
        case "6":
            family = "IPv6";
            break;
        default:
            family = "IPv4";
            break;
    }
    res.write(GetIp(family));
    res.end();
};

module.exports = {
    IPGET: IP_GET
}
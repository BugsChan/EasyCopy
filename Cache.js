

const fs = require('fs');

class Cache {

    constructor() {
        const dir = "WebSource";
        const dictionaries = ["/css/", "/js/", "/", "/imgs/"];
        this.cacheFiles = [];
        this.extTypes = {};
        for (let each of dictionaries) {
            let files = fs.readdirSync(dir + each);
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                file = each + file;
                if (!fs.statSync(dir + file).isFile())
                    continue;
                this.cacheFiles.push(file);
            }
        }
    }

    static createInstance() {
        if (!Cache._instance) {
            Cache._instance = new Cache();
        }
        return Cache._instance;
    }

    getFile(filepath, callback) {
        const dir = "WebSource";
        if (this.cacheFiles.indexOf(filepath) != -1) {
            fs.readFile(dir + filepath, (err, data) => {
                callback(err, data);
            });
        } else
            this.getFile("/index.html", callback);
    }

    setExtType(ext, type) {
        this.extTypes[ext] = type;
    }

    getExtType(ext) {
        return this.extTypes[ext];
    }
}

module.exports = {
    Cache: Cache
}
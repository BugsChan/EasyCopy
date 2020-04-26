

const fs = require('fs');

class Cache {

    constructor() {
        const dir = "WebSource";
        const dictionaries = ["/css/", "/js/", "/", "/imgs/"];
        this.cacheFiles = {};
        for (let each of dictionaries) {
            let files = fs.readdirSync(dir + each);
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                file = each + file;
                if (!fs.statSync(dir + file).isFile())
                    continue;
                this.cacheFiles[file] = fs.readFileSync(dir + file);
            }
        }
    }

    static createInstance() {
        if (!Cache._instance) {
            Cache._instance = new Cache();
        }
        return Cache._instance;
    }

    getFile(filepath) {
        if (filepath in this.cacheFiles)
            return this.cacheFiles[filepath];
        else
            return this.getFile("/index.html");
    }
}

module.exports = {
    Cache: Cache
}


const multer = require("multer");
const path = require("path");
const {Storage, AutoClear} = require("./Handle");

const UUID = () => {
    let s = "";
    const hexDigit = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 36; i++) {
        s += hexDigit[parseInt(Math.random() * hexDigit.length)];
    }
    return s;
};

const _Storage = multer.diskStorage({
	destination:"./userFiles",
	filename: (req, file, cb) => {
		if("uuid" in req.query)
			cb(null, req.query.uuid);
		else{
			cb(null, UUID());
		}
	}
});

const upload = multer({storage: _Storage});

const uploadFile = (req, res, next) => {
	req.setEncoding("utf-8");
	let filename = req.file.filename;
	let originalName = req.file.originalname;
	let plugin = originalName.split(".");
	plugin = plugin[plugin.length - 1];
	Storage["" + filename] = plugin;
	AutoClear();
	res.send(req.file.filename);
};

module.exports = {upload: upload, uploadFile: uploadFile};


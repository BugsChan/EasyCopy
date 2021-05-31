'use strict';
const express = require("express");
const expressApp = express();

expressApp.use("/", express.static("WebSource"));

const Handle = require("./Handle").Handle;
expressApp.use("/io", Handle);

const ipget = require("./IP_Get").IPGET;
expressApp.use("/ip", ipget);

expressApp.listen(80);

//��ֹ�쳣�����Զ��ر�
process.on('uncaughtException', function (err) {
    console.log(err);
});

const runWindow = require("./ele_win");
runWindow();

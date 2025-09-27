const fs = require('fs');

const LL = "--------------------";
const ViewsDir = __dirname + "/views/";
const CdnDir = __dirname + "/cdn/";

const LogReq = (req, res, next) => {
    const method = `[${req.method}] ~ ${req.url} ~ ${req.ip}`;
    if(!req.url.includes("/cdn/") && !req.url.includes("favicon.ico")) {
        console.log(method);
    }
    next();
}

function FormatSocketInfo(type, jsonInfo){
    return {
        "type": type,
        "info": jsonInfo
    }
}

function ResetMessageLog(){
    const JsonList = [];
    fs.writeFile(`${CdnDir}/storage/MessageLogs.json`, JSON.stringify(JsonList), `utf-8`, (err) => {
        if(err) return console.log(err);
    });
}

function PushMessageLog(jsonInfo){
    fs.readFile(`${CdnDir}/storage/MessageLogs.json`, 'utf8', (err, data) => {
        if(err) return console.log(err);
        let JsonData = JSON.parse(data);
        jsonInfo = {
            "UserInfo": jsonInfo.UserInfo,
            "Message": jsonInfo.Message,
        }
        JsonData.push(jsonInfo);

        fs.writeFile(`${CdnDir}/storage/MessageLogs.json`, JSON.stringify(JsonData), `utf-8`, (err) => {
            if(err) return console.log(err);
        });
    })
}

module.exports = { LL, ViewsDir, CdnDir, FormatSocketInfo, PushMessageLog, ResetMessageLog, LogReq };
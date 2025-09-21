const LL = "--------------------";
const ViewsDir = __dirname + "/views/";
const CdnDir = __dirname + "/cdn/";

function FormatSocketInfo(type, jsonInfo){
    return {
        "type": type,
        "info": jsonInfo
    }
}

module.exports = { LL, ViewsDir, CdnDir, FormatSocketInfo };
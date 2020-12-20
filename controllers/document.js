const md5File = require("md5-file");
let invoke = require("./invoke");
let query = require("./query");
const { v4: uuidv4 } = require("uuid");

storeFile = async(req,res) => {
        await Promise.all(req.files.map(async(file)=>{
        let hash = await md5File(file.path);
        file.size = file.size.toString();
        file.FileHash = hash;
        file.documentId = uuidv4();
        }))

       func = "registerDoc"; 
    let result = await invoke.invokeToChaincode( req,res, func, [JSON.stringify(req.files)])
    res.send(result);
}


getAllFiles = async(req,res) =>{
let func = "getAllDocs";
let result = await query.query(req,res, func , []);
let resultData = JSON.parse(result.myMessage);
let data = resultData.map((item) => { 
 return item.Record;
});
res.send(data);
}


getfileInfoByHash = async(req,res) =>{
let func = "getfileInfoByHash";
let {fileHash} = req.params;
let result = await query.query(req, res, func, [fileHash]);
let resultData = JSON.parse(result.myMessage);
let data = resultData.map((item) => {
  return item.Record;
});
res.send(data);
}





module.exports = {
  storeFile: storeFile,
  getAllFiles: getAllFiles,
  getfileInfoByHash: getfileInfoByHash,
};
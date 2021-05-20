const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const path = require("path");
var multer = require("multer");
const uploadfile = multer();
var cors = require("cors");
const environment = process.env.NODE_ENV;
const config = require("./config.json")[environment];
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});


const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `../${config.diskStorageLocation}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    console.log(req.files);
    var len = req.files.length;
    var ext = path.extname(file.originalname);
    const blobName =
      req.files[len - 1].fieldname +
      "-" +
      file.originalname +
      "-" +
      Date.now() +
      ext;
    cb(null, blobName);
  },
});


const upload = multer({
  storage: diskStorage,
});


app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


const fileController = require("./controllers/document");
app.post("/api/savefile", upload.any(), fileController.storeFile)
app.get("/api/getFilesData", fileController.getAllFiles);
app.get("/api/getfileInfoByHash/:fileHash", fileController.getfileInfoByHash);



const port = config.port || 3001;
app.listen(port, () => {
  console.log(
    "%s App running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    port
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;

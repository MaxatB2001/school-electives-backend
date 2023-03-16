const multer = require("multer")
const crypto = require("crypto")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static')
  },
  filename: function (req, file, cb) {
    const fileExtendtion = file.originalname.split('.').pop();
    const fileName = crypto.randomUUID() + "." + fileExtendtion;
    req.fileName = fileName
    cb(null, fileName)
  }
})

module.exports = {storage}
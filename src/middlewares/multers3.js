const S3Client = require("aws-sdk/clients/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config/config");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const s3 = new S3Client({
  region: config.AWS.region,
  accessKeyId: config.AWS.accessKey,
  secretAccessKey: config.AWS.secretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.AWS.bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  }),
});

module.exports = upload;

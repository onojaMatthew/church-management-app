import  aws from 'aws-sdk';
import shortid from "shortid"
import  multer from 'multer';
import  multerS3 from 'multer-s3';
import key from "../config/key";
 
const  s3 = new aws.S3({
  accessKeyId: key.S3_ACCESS_KEY,
  secretAccessKey: key.S3_SECRET_KEY
})
 
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: key.S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname)
    }
  })
});

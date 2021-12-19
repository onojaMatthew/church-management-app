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
    bucket: 'gig-alpha-bucket',
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname)
    }
  })
});
//========================Down from AWS==========================================
// app.get('/download-file', function(req, res, next){
 
//   // download the file via aws s3 here
//   var fileKey = req.query['fileKey'];

//   console.log('Trying to download file', fileKey);
   
//   AWS.config.update(
//     {
//       accessKeyId: "....",
//       secretAccessKey: "...",
//       region: 'ap-southeast-1'
//     }
//   );
//   var s3 = new AWS.S3();
//   var options = {
//       Bucket    : '/bucket-url',
//       Key    : fileKey,
//   };

//   res.attachment(fileKey);
//   var fileStream = s3.getObject(options).createReadStream();
//   fileStream.pipe(res);
// });
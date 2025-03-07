import  aws from 'aws-sdk';
import shortid from "shortid"
import  multer from 'multer';
import  multerS3 from 'multer-s3';
import key from "../config/key";
 
const  s3 = new aws.S3({
  accessKeyId: key.S3_ACCESS_KEY,
  secretAccessKey: key.S3_SECRET_KEY
})

// const spacesEndpoint = new AWS.Endpoint(key.BUCKET_LINK); // Change to your region
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.key.BUCKET_ACCESS_KEY, // Replace with your Access Key
//   secretAccessKey: process.env.key.BUCKET_SECRET_KEY, // Replace with your Secret Key (Risky for frontend)
//   region: process.env.key.BUCKET_REGION,
//   params: { Bucket: process.env.key.BUCKET_NAME }, // Change to your Space name
// });
 
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

// export const file_upload = async (req, res) => {
//   const { fileName, fileType } = req.body;
//   const params = {
//     Bucket: "your-space-name",
//     Key: `uploads/${fileName}`,
//     Expires: 60, // URL valid for 60 seconds
//     ContentType: fileType,
//     ACL: "public-read",
//   };

//   try {
//     const uploadURL = await s3.getSignedUrlPromise("putObject", params);
//     res.json({ uploadURL });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error generating presigned URL" });
//   }
// }

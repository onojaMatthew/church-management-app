import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env")});

export default ({
  SECRET_KEY: process.env.SECRET_KEY,
  PROD_DB: process.env.PROD_DB,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
});
  
    
   
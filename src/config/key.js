import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env")});

export default ({
  SECRET_KEY: process.env.SECRET_KEY,
  DB_HOST:  process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  DB_NAME:  process.env.DB_NAME,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
});
  
    
   
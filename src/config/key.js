import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env")});

export default ({
  SECRET_KEY: process.env.SECRET_KEY,
  PROD_DB: process.env.PROD_DB,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
});
  
    
   
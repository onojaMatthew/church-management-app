import path from "path";
import jwt from 'jsonwebtoken';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { errorResponse } from '../utils/response';
import { error, success } from '../config/response';

require("dotenv").config({ path: path.resolve(__dirname, "/../../.env")});

// export const createToken = (payload) => {
//   const token = jwt.sign({ payload }, process.env.SECRETKEY);
//   return `Bearer ${token}`;
// };

/**
 * This function verifies
 * that user token is valid
 * */
export const verifyToken = (req, res, next) => {
  let token = req.header("authorization");
  if (!token) return res.status(403).json(error("Access denied. No token provided", res.statusCode));
  token = token.split(' ')[1];
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  }
  catch(err) {
    return res.status(401).json(error("Invalid token", res.statusCode));
  }
};

/**
 * This function verifies that user is an admin
 */
// export const verifyAdmin = (req, res) => {
//     const { userType } = req.authData.payload;
//     if(userType !== 'admin'){
//       return res.status(403).json(error(messages.forbidden, res.statusCode))
//     }
//     return next();
// }

/**
 * This function verifies that user is superadmin
 */
// export const verifySuperAdmin = (req, res, next) => {
//     const { userType } = req.authData.payload;
//     if(userType !== 'super-admin'){
//         return res.status(403).json(error(messages.forbidden, res.statusCode))
//     }
//     return next();
// }

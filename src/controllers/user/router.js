import express from "express";
import { 
  createUser, 
  deleteAdmin, 
  fetchAdmin, 
  fetchAdmins, 
  forgotPassword, 
  resetPassword, 
  signIn, 
  updateProfile, 
  updateRole, 
} from "./controller";
import { loginValidator, new_admin_validator } from "../../validation/user";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();
// verifyToken, grantAccess("createAny", "super admin"),
router.post('/auth/login', loginValidator, signIn);
router.post('/auth/admin', verifyToken, new_admin_validator, createUser)
router.put('/auth/admin/:adminId', verifyToken, updateProfile),
router.post('/auth/forgot_password', forgotPassword);
router.post('/auth/reset_password/:token', resetPassword);
router.get('/auth/admins', verifyToken, fetchAdmins);
router.get("/auth/admin/:adminId", verifyToken, fetchAdmin);
router.put("/auth/role", verifyToken, updateRole);
router.delete("/auth/delete/:adminId", verifyToken, deleteAdmin);

export default router;
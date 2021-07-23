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
import { new_admin_validator } from "../../validation/user";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();
// verifyToken, grantAccess("createAny", "super admin"),
router.post('/auth/login', signIn);
router.post('/auth/admin', new_admin_validator, createUser)
router.put('/auth/admin/:adminId', verifyToken, grantAccess("updateOwn", "admin"), updateProfile),
router.post('/auth/forgot_password', forgotPassword);
router.post('/auth/reset_password/:token', resetPassword);
router.get('/auth/admins', verifyToken, grantAccess("readAny", "super admin"), fetchAdmins);
router.get("/auth/admin/:adminId", verifyToken, grantAccess("readOwn", "admin"), fetchAdmin);
router.put("/auth/role", verifyToken, grantAccess("updateAny", "super admin"), updateRole);
router.delete("/auth/delete/:adminId", verifyToken, grantAccess("deleteAny", "super admin"), deleteAdmin);

export default router;
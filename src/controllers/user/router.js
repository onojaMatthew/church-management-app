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
  logout,
  church_logo,
} from "./controller";
import { loginValidator } from "../../validation/user";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();
// verifyToken, grantAccess("createAny", "super admin"),
router.post('/auth/login', loginValidator, signIn);
router.get("/auth/logout", logout);
router.post('/auth/admin', verifyToken, createUser);
router.put('/auth/admin/:adminId', verifyToken, updateProfile),
router.post('/auth/forgot_password', forgotPassword);
router.get("/auth/admin/logo", church_logo);
router.post('/auth/reset_password/:token', resetPassword);
router.get('/auth/admins', verifyToken, fetchAdmins);
router.get("/auth/admin/:adminId", verifyToken, fetchAdmin);
router.put("/auth/role", verifyToken, updateRole);
router.delete("/auth/delete/:adminId", verifyToken, deleteAdmin);

export default router;
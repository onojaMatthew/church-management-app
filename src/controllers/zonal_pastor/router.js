import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { loginValidator } from "../../validation/church";
import { forgotPasswordValidator, resetPasswordValidator } from "../../validation/user";
import { check_zonal_pastor } from "../../validation/zonal_pastor";
import { 
  assign_churches, 
  zonal_pastor_list, 
  create_zonal_pastor, 
  delete_zonal_pastor, 
  login, 
  update_zonal_pastor, 
  zone_church_list, 
  search_zonal_pastor, 
  zonal_pastor_filter, 
  forgotPassword,
  resetPassword
} from "./controller";


const router = express.Router();

router.post("/zonal_pastor/new", verifyToken, grantAccess("createAny", "super admin"), check_zonal_pastor, create_zonal_pastor);
router.post("/zonal_pastor/login", loginValidator, login);
router.get("/zonal_pastor/all", verifyToken, grantAccess("readAny", "super admin"), zonal_pastor_list);
router.put("/zonal_pastor/assign_church", verifyToken, grantAccess("updateAny", "super admin"), assign_churches);
router.get("/zonal_pastor/church_list", verifyToken, grantAccess("readOwn", "zonal pastor"), zone_church_list);
router.get("/zonal_pastor/search", verifyToken, grantAccess("readAny", "super admin"), search_zonal_pastor);
router.get("/zonal_pastor/filter", verifyToken, grantAccess("readAny", "super admin"), zonal_pastor_filter);
router.post("/zonal_pastor/forgot_password", forgotPasswordValidator, forgotPassword);
router.post("/zonal_pastor/reset_password/:token", resetPasswordValidator, resetPassword);
router.put("/zonal_pastor/update", verifyToken, grantAccess("updateOwn", "zonal pastor"), update_zonal_pastor);
router.delete("/zonal_pastor/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_zonal_pastor);

export default router;
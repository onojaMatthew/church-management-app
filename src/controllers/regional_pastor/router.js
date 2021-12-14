import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { check_regional_pastor } from "../../validation/regional_pastor";
import { 
  assign_churches, 
  regional_pastor_list, 
  create_regional_pastor, 
  delete_regional_pastor, 
  login, 
  update_regional_pastor, 
  region_church_list, 
  search_regional_pastor, 
  region_pastor_filter,
  regional_pastor_details,
} from "./controller";


const router = express.Router();

router.post("/regional_pastor/new", verifyToken, grantAccess("createAny", "super admin"), check_regional_pastor, create_regional_pastor);
router.post("/regional_pastor/login", login);
router.get("/regional_pastor/all", verifyToken, grantAccess("readAny", "super admin"), regional_pastor_list);
router.put("/regional_pastor/assign_church", verifyToken, grantAccess("updateAny", "super admin"), assign_churches);
router.get("/regional_pastor/church_list", verifyToken, grantAccess("readOwn", "regional pastor"), region_church_list);
router.get("/regional_pastor/details", verifyToken, grantAccess("readOwn", "regional pastor"), regional_pastor_details);
router.get("/regional_pastor/search", verifyToken, grantAccess("readAny", "super admin"), search_regional_pastor);
router.get("/regional_pastor/filter", verifyToken, grantAccess("readAny", "super admin"), region_pastor_filter);
router.put("/regional_pastor/update", verifyToken, grantAccess("updateOwn", "regional pastor"), update_regional_pastor);
router.delete("/regional_pastor/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_regional_pastor);

export default router;
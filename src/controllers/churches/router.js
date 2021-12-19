import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { loginValidator, newChurchValidator } from "../../validation/church";
import { 
  allChurches, 
  churchDetails, 
  churchList, 
  churchLogin, 
  createChurch, 
  dashboardData, 
  deleteChurch, 
  updateChurch,
  searchChurch,
  church_filter,
  adminData,
} from "./controller";

const router = express.Router();

router.post("/church/new", verifyToken, grantAccess("createAny", "super admin"), newChurchValidator, createChurch);
router.post("/church/login", churchLogin);
router.get("/church/all", verifyToken, grantAccess("readAny", "super admin"), churchList);
router.get("/church/dashbord_data", verifyToken, grantAccess("readOwn", "church"), dashboardData)
router.get("/church/detail/:churchId", verifyToken, grantAccess("readAny", "super admin"), churchDetails);
router.get("/church/search", verifyToken, grantAccess("readAny", "super admin"), searchChurch);
router.get("/church/admin_data", verifyToken, grantAccess("readAny", "super admin"), adminData);
router.get("/church/filter", verifyToken, grantAccess("readAny", "super admin"), church_filter);
router.get("/church/all/list", verifyToken, grantAccess("readAny", "super admin"), allChurches);
router.put("/church/update/:churchId", verifyToken, grantAccess("updateAny", "super admin"), updateChurch);
router.delete("/church/delete", verifyToken, grantAccess("deleteAny", "super admin"), deleteChurch);

export default router;
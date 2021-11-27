import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { loginValidator, newChurchValidator, validateChurch } from "../../validation/church";
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
} from "./controller";

const router = express.Router();

router.post("/church/new", verifyToken, grantAccess("createAny", "super admin"), createChurch);
router.post("/church/login", churchLogin);
router.get("/church/all", verifyToken, grantAccess("readAny", "super admin"), churchList);
router.get("/church/dashbord_data", verifyToken, grantAccess("readOwn", "church"), dashboardData)
router.get("/church/detail/:churchId", verifyToken, grantAccess("readAny", "super admin"), churchDetails);
router.get("/church/search", verifyToken, grantAccess("readAny", "super admin"), searchChurch)
router.get("/church/all/list", verifyToken, grantAccess("readAny", "super admin"), allChurches);
router.put("/church/update/:churchId", verifyToken, grantAccess("updateAny", "super admin"), updateChurch);
router.delete("/church/delete/:churchId", verifyToken, grantAccess("deleteAny", "super admin"), deleteChurch);

export default router;
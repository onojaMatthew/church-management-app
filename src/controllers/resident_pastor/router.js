import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { 
  create_residence_pastor, 
  delete_pastor, 
  pastor_detail, 
  resident_pastor_filter, 
  resident_pastor_list, 
  search_resident_pastor, 
  update_detail 
} from "./controller";

const router = express.Router();

router.post("/resident_pastor/new", verifyToken, grantAccess("createAny", "super admin"), create_residence_pastor);
router.get("/resident_pastor/all", verifyToken, grantAccess("readAny", "super admin"), resident_pastor_list);
router.get("/resident_pastor/details", verifyToken, grantAccess("readOwn", "resident pastor"), pastor_detail);
router.put("/resident_pastor/update", verifyToken, grantAccess("updateOwn", "resident pastor"), update_detail);
router.get("/resident_pastor/search", verifyToken, grantAccess("readAny", "super admin"), search_resident_pastor);
router.get("/resident_pastor/filter", verifyToken, grantAccess("readAny", "super admin"), resident_pastor_filter);
router.delete("/resident_pastor/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_pastor);

export default router;
import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { 
  create_report, 
  report_list, 
  report_by_church, 
  report_by_coordinator, 
  report_details, 
  delete_report, 
  coordinator_remark, 
  gco_remark, 
  searchReport,
  report_filter, 
  report_by_regional_pastor,
  regional_pastor_remark
} from "./controller";

const router = express.Router();

router.post("/report/new", verifyToken, grantAccess("createOwn", "church"), create_report);
router.get("/report/all", verifyToken, grantAccess("readAny", "super admin"), report_list);
router.get("/report/details", verifyToken, grantAccess("readOwn", "church"), report_details);
router.put("/report/go_remark", verifyToken, grantAccess("updateAny", "super admin"), gco_remark);
router.get("/report/coordinator_reports", verifyToken, grantAccess("readOwn", "zonal pastor"), report_by_coordinator);
router.get("/report/regional_pastor_reports", verifyToken, grantAccess("readOwn", "regional pastor"), report_by_regional_pastor);
router.get("/report/church_reports", verifyToken, grantAccess("readOwn", "church"), report_by_church);
router.get("/report/search", verifyToken, grantAccess("readOwn", "church"), searchReport);
router.get("/report/filter", verifyToken, grantAccess("readOwn", "church"), report_filter);
router.put("/report/coordinator_remark", verifyToken, grantAccess("updateOwn", "zonal pastor"), coordinator_remark);
router.put("/report/regional_pastor_remark", verifyToken, grantAccess("updateOwn", "regional pastor"), regional_pastor_remark);
router.delete("/report/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_report);

export default router;
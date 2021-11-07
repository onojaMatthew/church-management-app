import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { create_report, report_list, report_by_church, report_by_coordinator, report_details, delete_report, coordinator_remark, gco_remark } from "./controller";

const router = express.Router();

router.post("/report/new", verifyToken, grantAccess("createOwn", "church"), create_report);
router.get("/report/all", verifyToken, grantAccess("readAny", "super admin"), report_list);
router.get("/report/details", verifyToken, grantAccess("readOwn", "church"), report_details);
router.get("/report/coordinator_reports", verifyToken, grantAccess("readAny", "coordinator"), report_by_coordinator);
router.get("/report/church_reports", verifyToken, grantAccess("readOwn", "church"), report_by_church);
router.put("/report/coordinator_remark", verifyToken, grantAccess("updateAny", "coordinator"), coordinator_remark);
router.put("/report/gco_remark", verifyToken, grantAccess("updateAny", "super admin"), gco_remark);
router.delete("/report/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_report);

export default router;
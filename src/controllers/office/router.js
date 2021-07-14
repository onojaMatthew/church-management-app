import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();

router.post("/office/new", verifyToken, grantAccess("createAny", "super admin"), create);
router.get("/office/all", verifyToken, grantAccess("readAny", "church"), fetchOfficeList);
router.get("/office/detail/:officeId", verifyToken, grantAccess("readOwn", "church"), fetchOffice);
router.put("/office/update/:officeId", verifyToken, grantAccess("updateOwn", "church"), updateOffice);
router.delete("/office/delete/:officeId", verifyToken, grantAccess("deleteAny", "church"), deleteOffice);

export default router;
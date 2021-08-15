import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { office_validator, param_validator } from "../../validation/office";

const router = express.Router();

router.post("/office/new", verifyToken, grantAccess("createOwn", "church"), create);
router.get("/office/all/:churchId", verifyToken, grantAccess("readOwn", "church"), fetchOfficeList);
router.get("/office/detail/:officeId/:churchId", verifyToken, grantAccess("readOwn", "church"), fetchOffice);
router.put("/office/update/:officeId/:churchId", verifyToken, grantAccess("updateOwn", "church"), updateOffice);
router.delete("/office/delete/:officeId/:churchId", verifyToken, grantAccess("deleteOwn", "church"), deleteOffice);

export default router;
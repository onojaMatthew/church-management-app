import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { office_validator, param_validator } from "../../validation/office";

const router = express.Router();

router.post("/office/new", verifyToken, grantAccess("createOwn", "branch church"), create);
router.get("/office/all/:churchId", verifyToken, grantAccess("readOwn", "branch church"), fetchOfficeList);
router.get("/office/detail/:officeId/:churchId", verifyToken, grantAccess("readOwn", "branch church"), fetchOffice);
router.put("/office/update/:officeId/:churchId", verifyToken, grantAccess("updateOwn", "branch church"), updateOffice);
router.delete("/office/delete/:officeId/:churchId", verifyToken, grantAccess("deleteOwn", "branch church"), deleteOffice);

export default router;
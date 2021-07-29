import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { office_validator, param_validator } from "../../validation/office";

const router = express.Router();
// , grantAccess("createOwn", "church"), 
router.post("/office/new", verifyToken, create);
// verifyToken, grantAccess("readOwn", "church"), office_validator, 
router.get("/office/all/:churchId", verifyToken, fetchOfficeList);
// verifyToken, grantAccess("readOwn", "church"), param_validator, 
router.get("/office/detail/:officeId/:churchId", verifyToken, fetchOffice);
// verifyToken, grantAccess("updateOwn", "church"), param_validator, 
router.put("/office/update/:officeId/:churchId", verifyToken, updateOffice);
// verifyToken, grantAccess("deleteOwn", "church"), param_validator, 
router.delete("/office/delete/:officeId/:churchId", verifyToken, deleteOffice);

export default router;
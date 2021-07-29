import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { office_validator, param_validator } from "../../validation/office";

const router = express.Router();
// verifyToken, grantAccess("createOwn", "church"), 
router.post("/office/new", create);
// verifyToken, grantAccess("readOwn", "church"), office_validator, 
router.get("/office/all/:churchId", fetchOfficeList);
// verifyToken, grantAccess("readOwn", "church"), param_validator, 
router.get("/office/detail/:officeId/:churchId", fetchOffice);
// verifyToken, grantAccess("updateOwn", "church"), param_validator, 
router.put("/office/update/:officeId/:churchId", updateOffice);
// verifyToken, grantAccess("deleteOwn", "church"), param_validator, 
router.delete("/office/delete/:officeId/:churchId", deleteOffice);

export default router;
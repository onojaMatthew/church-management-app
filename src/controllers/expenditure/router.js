import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { validateInput } from "../../validation/expenditure";
import { create_expenditure, delete_expenditure, expenditure, expenditure_filter, expenditure_list, search_expenditure } from "./controller";

const router = express.Router();

router.post("/expenditure/new", verifyToken, grantAccess("createOwn", "church"), validateInput, create_expenditure);
router.get("/expenditure/all", verifyToken, grantAccess("readOwn", "church"), expenditure_list);
router.get("/expenditure/search", verifyToken, grantAccess("readOwn", "church"), search_expenditure);
router.get("/expenditure/filter", verifyToken, grantAccess("readOwn", "church"), expenditure_filter);
router.delete("/expenditure/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_expenditure);
router.get("/expenditure/detail", verifyToken, grantAccess("readOwn", "church"), expenditure);

export default router;
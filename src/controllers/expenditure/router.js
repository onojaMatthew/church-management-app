import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { validateInput } from "../../validation/expenditure";
import { create_expenditure, delete_expenditure, expenditure, expenditure_filter, expenditure_list, search_expenditure, total_finance } from "./controller";

const router = express.Router();

router.post("/expenditure/new", verifyToken, grantAccess("createOwn", "branch church"), validateInput, create_expenditure);
router.get("/expenditure/all", verifyToken, grantAccess("readOwn", "branch church"), expenditure_list);
router.get("/expenditure/search", verifyToken, grantAccess("readOwn", "branch church"), search_expenditure);
router.get("/expenditure/filter", verifyToken, grantAccess("readOwn", "branch church"), expenditure_filter);
router.get("/expenditure/total", total_finance);
router.delete("/expenditure/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_expenditure);
router.get("/expenditure/detail", verifyToken, grantAccess("readOwn", "branch church"), expenditure);

export default router;
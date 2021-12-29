import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { create_finance, get_income_details, get_income_list, delete_income, update_income } from "./controller";

const router = express.Router();

router.post("/finance/new", verifyToken, grantAccess("createOwn", "branch church"), create_finance);
router.get("/finance/all", verifyToken, grantAccess("readOwn", "branch church"), get_income_list);
router.get("/finance/details", verifyToken, grantAccess("readOwn", "branch church"), get_income_details);
router.put("/finance/update", verifyToken, grantAccess("updateOwn", "branch church"), update_income);
router.delete("/finance/delete", verifyToken, grantAccess("deleteOwn", "branch church"), delete_income);

export default router;
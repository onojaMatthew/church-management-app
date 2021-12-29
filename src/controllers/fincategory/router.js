import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { fin_category_validator } from "../../validation/fin_category";
import { category_details, category_list, create_fin_category, delete_category, update_category } from "./controller";

const router = express.Router();

router.post("/fin_category/new", verifyToken, grantAccess("createOwn", "branch church"), fin_category_validator, create_fin_category, () => console.log("hey"));
router.get("/fin_category/all", verifyToken, grantAccess("readOwn", "branch church"), category_list);
router.get("/fin_category/details", verifyToken, grantAccess("readOwn", "branch church"), category_details);
router.put("/fin_category/update", verifyToken, grantAccess("updateOwn", "branch church"), update_category);
router.delete("/fin_category/delete", verifyToken, grantAccess("deleteOwn", "branch church"), delete_category);

export default router;
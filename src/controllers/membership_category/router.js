import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { body_validator, category_validator, param_validator } from "../../validation/category";
import { create, deleteCategory, fetchCategory, fetchCategoryList, updateCategory } from "./controller";

const router = express.Router();

router.post("/mem_category/new", verifyToken, grantAccess("createOwn", "church"), create);
router.get("/mem_category/all/:churchId", verifyToken, grantAccess("readOwn", "church"), fetchCategoryList);
router.get("/mem_category/detail/:id/:churchId", verifyToken, grantAccess("readOwn", "church"), fetchCategory);
router.put("/mem_category/update/:id/:churchId", verifyToken, grantAccess("updateOwn", "church"), updateCategory);
router.delete("/mem_category/delete/:id/:churchId", verifyToken, grantAccess("deleteOwn", "church"), deleteCategory);

export default router;
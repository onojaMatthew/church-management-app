import express from "express";
import { create, deleteCategory, fetchCategory, fetchCategoryList, updateCategory } from "./controller";

const router = express.Router();

router.post("/mem_category/new", create);
router.get("/mem_category/all", fetchCategoryList);
router.get("/mem_category/detail/:id", fetchCategory);
router.put("/mem_category/update/:id", updateCategory);
router.delete("/mem_category/delete/:id", deleteCategory);

export default router;
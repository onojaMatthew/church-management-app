import express from "express";
import { verifyToken } from "../../middleware/auth";
import { baptism_validator } from "../../validation/birthday";
import { delete_baptism, filter, search } from "./controller";
import { update_baptism, baptism_details, baptism_list, create_baptism } from "./controller";

const router = express.Router();

router.post("/baptism/new", verifyToken, baptism_validator, create_baptism);
router.get("/baptism/list", verifyToken, baptism_list);
router.get("/baptism/details", verifyToken, baptism_details);
router.put("/baptism/update", verifyToken, update_baptism);
router.delete("/baptism/delete", verifyToken, delete_baptism);
router.get("/baptism/search", verifyToken, search);
router.get("/baptism/filter", verifyToken, filter);

export default router;
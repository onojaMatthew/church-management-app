import express from "express";
import { verifyToken } from "../../middleware/auth";
import { dedication_validator } from "../../validation/birthday";
import { create_dedication, dedication_details, dedication_list, delete_dedication, filter, search, update_dedication } from "./controller";

const router = express.Router();

router.post("/dedication/new", verifyToken, dedication_validator, create_dedication);
router.get("/dedication/list", verifyToken, dedication_list);
router.get("/dedication/details", verifyToken, dedication_details);
router.put("/dedication/update", verifyToken, update_dedication);
router.delete("/dedication/delete", verifyToken, delete_dedication);
router.get("/dedication/search", verifyToken, search);
router.get("/dedication/filter", verifyToken, filter)

export default router;
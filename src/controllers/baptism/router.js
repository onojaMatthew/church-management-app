import express from "express";
import { baptism_validator } from "../../validation/birthday";
import { delete_baptism } from "./controller";
import { update_baptism } from "./controller";
import { baptism_details } from "./controller";
import { baptism_list } from "./controller";
import { create_baptism } from "./controller";

const router = express.Router();

router.post("/new", baptism_validator, create_baptism);
router.get("/list", baptism_list);
router.get("/details", baptism_details);
router.put("/update", update_baptism);
router.delete("/delete", delete_baptism);

export default router;
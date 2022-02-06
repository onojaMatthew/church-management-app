import express from "express";
import { baptism_validator } from "../../validation/birthday";
import { delete_baptism } from "./controller";
import { update_baptism } from "./controller";
import { baptism_details } from "./controller";
import { baptism_list } from "./controller";
import { create_baptism } from "./controller";

const router = express.Router();

router.post("/baptism/new", baptism_validator, create_baptism);
router.get("/baptism/list", baptism_list);
router.get("/baptism/details", baptism_details);
router.put("/baptism/update", update_baptism);
router.delete("/delete", delete_baptism);

export default router;
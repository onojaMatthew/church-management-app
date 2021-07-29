import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { loginValidator, newChurchValidator, validateChurch } from "../../validation/church";
import { churchDetails, churchList, churchLogin, createChurch, deleteChurch, updateChurch } from "./controller";

const router = express.Router();

router.post("/church/new", verifyToken, newChurchValidator, createChurch);
router.post("/church/login", loginValidator, churchLogin);
router.get("/church/all", verifyToken, churchList);
router.get("/church/detail/:churchId", verifyToken, validateChurch, churchDetails);
router.put("/church/update/:churchId", verifyToken, validateChurch, updateChurch);
router.delete("/church/delete/:churchId", verifyToken, validateChurch, deleteChurch);

export default router;
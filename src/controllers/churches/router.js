import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { loginValidator, newChurchValidator, validateChurch } from "../../validation/church";
import { churchDetails, churchList, churchLogin, createChurch, deleteChurch, updateChurch } from "./controller";

const router = express.Router();

router.post("/church/new", verifyToken, grantAccess("createAny", "super admin"), createChurch);
router.post("/church/login", churchLogin);
router.get("/church/all", verifyToken, grantAccess("readAny", "super admin"), churchList);
router.get("/church/detail/:churchId", verifyToken, grantAccess("readAny", "super admin"), churchDetails);
router.put("/church/update/:churchId", verifyToken, grantAccess("updateAny", "super admin"), updateChurch);
router.delete("/church/delete/:churchId", verifyToken, grantAccess("deleteAny", "super admin"), deleteChurch);

export default router;
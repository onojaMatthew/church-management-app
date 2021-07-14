import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { newChurchValidator, validateChurch } from "../../validation/church";
import { churchDetails, churchList, createChurch, deleteChurch, updateChurch } from "./controller";


const router = express.Router();

router.post("/church/new", verifyToken, grantAccess("createAny", "super admin"), newChurchValidator, createChurch);
router.get("/church/all", verifyToken, grantAccess("readAny", "super admin"), churchList);
router.get("/church/detail/:churchId", verifyToken, grantAccess("readOwn", "church"), validateChurch, churchDetails);
router.put("/church/update/:churchId", verifyToken, grantAccess("updateOwn", "church"), validateChurch, updateChurch);
router.delete("/church/delete/:churchId", verifyToken, grantAccess("deleteAny", "super admin"), validateChurch, deleteChurch);

export default router;
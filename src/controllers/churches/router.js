import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { churchDetails, churchList, createChurch, deleteChurch, updateChurch } from "./controller";


const router = express.Router();

router.post("/church/new", verifyToken, grantAccess("createAny", "super admin"), createChurch);
router.get("/church/all", verifyToken, grantAccess("readAny", "super admin"), churchList);
router.get("/church/detail/:churchId", verifyToken, grantAccess("readOwn", "church"), churchDetails);
router.put("/church/update/:churchId", verifyToken, grantAccess("updateOnw", "church"), updateChurch);
router.delete("/church/delete/:churchId", verifyToken, grantAccess("deleteAny", "super admin"), deleteChurch);

export default router;
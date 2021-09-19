import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { upload } from "../../services/uploader";
import { burialDetail, createBurial, death_list, deleteBurial, updateBurial } from "./controller";


const router = express.Router();

router.post("/burial/new", verifyToken, grantAccess("createOwn", "church"), upload.fields([
  { name: "first_name", maxCount: 1 },
  { name: "last_name", maxCount: 1 },
  { name: "age", maxCount: 1 },
  { name: "officiating_pastor", maxCount: 1 },
  { name: "burial_venue", maxCount: 1 },
  { name: "death_date", maxCount: 1 },
  { name: "image_url", maxCount: 1 },
  { name: "position", maxCount: 1 },
  { name: "sex", maxCount: 1 },
]), createBurial);
router.get("/burial/all", verifyToken, grantAccess("readOwn", "church"), death_list);
router.get("/burial/detail", verifyToken, grantAccess("readOwn", "church"), burialDetail);
router.put("/burial/update", verifyToken, grantAccess("updateOwn", "church"), updateBurial);
router.delete("/burial/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteBurial);

export default router;
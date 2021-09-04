import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { upload } from "../../services/uploader";
import { create, deleteWedding, getWeddingList, updateWedding } from "./controller";

const router = express.Router();

router.post("/wedding/new", verifyToken, grantAccess("createOwn", "church"), upload.fields([
  { name: groom_first_name, maxCount: 1 }, 
  { name: groom_last_name, maxCount: 1 }, 
  { name: groom_phone_number, maxCount: 1 }, 
  { name: bride_first_name, maxCount: 1 }, 
  { name: bride_last_name, maxCount: 1 }, 
  { name: bride_phone_number, maxCount: 1 },
  { name: venue, maxCount: 1 },
  { name: date, maxCount: 1 },
  { name: lead_pastor, maxCount: 1 },
  { name: wedding_picture, maxCount: 1 }
]), create);
router.get("/wedding/all", verifyToken, grantAccess("readOwn", "church"), getWeddingList);
router.update("/wedding/update", verifyToken, grantAccess("updateOwn", "church"), updateWedding);
router.delete("/wedding/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteWedding);
export default router;
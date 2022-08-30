import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { create, deleteWedding, getWeddingList, updateWedding } from "./controller";

const router = express.Router();

router.post("/wedding/new", verifyToken, grantAccess("createOwn", "church"), create);
router.get("/wedding/all", verifyToken, grantAccess("readOwn", "church"), getWeddingList);
router.put("/wedding/update", verifyToken, grantAccess("updateOwn", "church"), updateWedding);
router.delete("/wedding/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteWedding);
export default router;
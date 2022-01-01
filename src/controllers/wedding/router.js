import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { create, deleteWedding, getWeddingList, updateWedding } from "./controller";

const router = express.Router();

router.post("/wedding/new", verifyToken, grantAccess("createOwn", "branch church"), create);
router.get("/wedding/all", verifyToken, grantAccess("readOwn", "branch church"), getWeddingList);
router.put("/wedding/update", verifyToken, grantAccess("updateOwn", "branch church"), updateWedding);
router.delete("/wedding/delete", verifyToken, grantAccess("deleteOwn", "branch church"), deleteWedding);
export default router;
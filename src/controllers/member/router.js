import express from "express";
import { assignOffice, createMember, deleteMember, getMembers, memberDetails, updateMember } from "./controller";
import { verifyToken } from "../../middleware/auth";
import { } from "../../middleware/access";

const router = express.Router();

router.post("/member/new", verifyToken, grantAccess("createOwn", "church"), createMember);
router.get("/member/all/:church", verifyToken, grantAccess("createOwn", "church"), getMembers);
router.get("/member/details/:member/:church", verifyToken, grantAccess("createOwn", "church"), memberDetails);
router.put("/member/update/:member/:church", verifyToken, grantAccess("createOwn", "church"), updateMember);
router.put("/member/assign_office/:member/:church", verifyToken, grantAccess("createOwn", "church"), assignOffice);
router.delete("/member/delete/:church/:memberId", verifyToken, grantAccess("createOwn", "church"), deleteMember);

export default router;
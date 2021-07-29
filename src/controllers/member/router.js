import express from "express";
import { assignOffice, createMember, deleteMember, getMembers, memberDetails, updateMember } from "./controller";
import { verifyToken } from "../../middleware/auth";
import { grantAccess } from "../../middleware/access";
import { body_validator } from "../../validation/member";

const router = express.Router();

router.post("/member/new", verifyToken, body_validator, createMember);
router.get("/member/all/:church", verifyToken, getMembers);
router.get("/member/details/:member/:church", verifyToken,  memberDetails);
router.put("/member/update/:member/:church", verifyToken, updateMember);
router.put("/member/assign_office/:member/:church", verifyToken, assignOffice);
router.delete("/member/delete/:church/:memberId", verifyToken, deleteMember);

export default router;
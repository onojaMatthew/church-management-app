import express from "express";
import { assignOffice, createMember, deleteMember, getMembers, memberDetails, searchMember, updateMember } from "./controller";
import { verifyToken } from "../../middleware/auth";
import { grantAccess } from "../../middleware/access";
import { body_validator } from "../../validation/member";

const router = express.Router();

router.post("/member/new", verifyToken, grantAccess("createOwn", "branch church"), createMember);
router.get("/member/search", verifyToken, grantAccess("readOwn", "branch church"), searchMember)
router.get("/member/all/:church", verifyToken, grantAccess("readOwn", "branch church"), getMembers);
router.get("/member/details/:member/:church", verifyToken, grantAccess("readOwn", "branch church"), memberDetails);
router.put("/member/update/:member/:church", verifyToken, grantAccess("updateOwn", "branch church"), updateMember);
router.put("/member/assign_office/:member/:church", verifyToken, grantAccess("updateOwn", "branch church"), assignOffice);
router.delete("/member/delete/:church/:memberId", verifyToken, grantAccess("deleteOwn", "branch church"), deleteMember);

export default router;
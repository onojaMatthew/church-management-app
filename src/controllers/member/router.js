import express from "express";
import { assignOffice, createMember, deleteMember, getMembers, memberDetails, updateMember } from "./controller";

const router = express.Router();

router.post("/member/new", createMember);
router.get("/member/all/:church", getMembers);
router.get("/member/details/:member/:church", memberDetails);
router.put("/member/update/:member/:church", updateMember);
router.put("/member/assign_office/:member/:church", assignOffice);
router.delete("/member/delete/:church/:memberId", deleteMember);

export default router;
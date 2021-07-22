import express from "express";
import { createMember, deleteMember, getMembers } from "./controller";

const router = express.Router();

router.post("/member/new", createMember);
router.get("/member/all/:church", getMembers);
router.delete("/member/delete/:church/:memberId", deleteMember);

export default router;
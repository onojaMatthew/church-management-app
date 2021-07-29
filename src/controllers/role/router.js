import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { createRole, deleteRole, fetchRole, fetchRoles, updateRole } from "./controller";


const router = express.Router();
//  
router.post("/role/new", verifyToken, createRole);
router.get("/role/all", verifyToken, fetchRoles);
router.get("/role/:roleId", verifyToken, fetchRole);
router.put("/role/:roleId", verifyToken, updateRole);
router.delete("/role/:roleId", verifyToken, deleteRole);

export default router;
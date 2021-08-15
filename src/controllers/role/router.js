import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { createRole, deleteRole, fetchRole, fetchRoles, updateRole } from "./controller";


const router = express.Router();
//  
router.post("/role/new", verifyToken,grantAccess("createAny", "super admin"), createRole);
router.get("/role/all", verifyToken, grantAccess("readAny", "super admin"), fetchRoles);
router.get("/role/:roleId", verifyToken, grantAccess("readAny", "super admin"), fetchRole);
router.put("/role/:roleId", verifyToken, grantAccess("updateAny", "super admin"), updateRole);
router.delete("/role/:roleId", verifyToken, grantAccess("deleteAny", "super admin"), deleteRole);

export default router;
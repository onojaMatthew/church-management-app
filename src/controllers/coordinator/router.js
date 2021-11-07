import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { assign_churches, coordinatore_list, create_coordinator, delete_coordinator, login, update_coordinator } from "./controller";


const router = express.Router();

router.post("/coordinator/new", verifyToken, grantAccess("createAny", "super admin"), create_coordinator);
router.post("/coordinator/login", login);
router.get("/coordinator/all", verifyToken, grantAccess("readAny", "super admin"), coordinatore_list);
router.put("/coordinator/assign_church", verifyToken, grantAccess("updateAny", "super admin"), assign_churches);
router.put("/coordinator/update", verifyToken, grantAccess("updateOwn", "zonal_coordinator"), update_coordinator);
router.delete("/coordinator/delete", verifyToken, grantAccess("deleteAny", "super admin"), delete_coordinator);

export default router;
import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery } from "../../validation/group";
import { deleteGroup, group, groupList, postGroup, updateGroup } from "./controllers";
import { verifyToken } from "../../middleware/auth"


const router = express.Router();

router.post("/group/new", verifyToken, grantAccess("createOwn", "church"),  postGroup);
router.get("/group/all/:church", verifyToken, grantAccess("readOwn", "church"), validateParams, groupList);
router.get("/group/detail", verifyToken, grantAccess("readOwn", "church"), validateQuery, group);
router.put("/group/update", verifyToken, grantAccess("updateOwn", "church"), updateGroup);
router.delete("/group/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteGroup);

export default router;
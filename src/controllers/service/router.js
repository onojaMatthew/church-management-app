import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery } from "../../validation/group";
import { deleteService, service, ServiceList, postService, updateService } from "./controllers";
import { verifyToken } from "../../middleware/auth"


const router = express.Router();

router.post("/service/new", verifyToken, grantAccess("createOwn", "church"),  postGroup);
router.get("/service/all/:church", verifyToken, grantAccess("readOwn", "church"), validateParams, groupList);
router.get("/service/detail", verifyToken, grantAccess("readOwn", "church"), validateQuery, group);
router.put("/service/update", verifyToken, grantAccess("updateOwn", "church"), updateGroup);
router.delete("/service/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteGroup);

export default router;
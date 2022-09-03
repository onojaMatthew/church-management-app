import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery, validateInput } from "../../validation/service";
import { verifyToken } from "../../middleware/auth"
import { serviceList, postService, service, updateService, deleteService } from "./controller";


const router = express.Router();

router.post("/service/new", verifyToken, grantAccess("createOwn", "branch church"), validateInput, postService);
router.get("/service/all/:church", verifyToken, grantAccess("readOwn", "branch church"), validateParams, serviceList);
router.get("/service/detail", verifyToken, grantAccess("readOwn", "branch church"), service);
router.put("/service/update", verifyToken, grantAccess("updateOwn", "branch church"), updateService);
router.delete("/service/delete", verifyToken, grantAccess("deleteOwn", "branch church"), deleteService);

export default router;
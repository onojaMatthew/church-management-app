import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery, validateInput } from "../../validation/service";
import { verifyToken } from "../../middleware/auth"
import { serviceList, postService, service, updateService, deleteService, search } from "./controller";


const router = express.Router();

router.post("/service/new", verifyToken, grantAccess("createOwn", "church"), validateInput, postService);
router.get("/service/all/:church", verifyToken, grantAccess("readOwn", "church"), validateParams, serviceList);
router.get("/service/detail", verifyToken, grantAccess("readOwn", "church"), service);
router.put("/service/update", verifyToken, grantAccess("updateOwn", "church"), updateService);
router.delete("/service/delete", verifyToken, grantAccess("deleteOwn", "church"), deleteService);
router.get("/service/search", verifyToken, grantAccess("readOwn", "church"), search);

export default router;
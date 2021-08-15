import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery, validateInput } from "../../validation/birthday";
import { verifyToken } from "../../middleware/auth"
import { eventList, postBirthday, event, updateEvent, deleteEvent } from "./controller";


const router = express.Router();

router.post("/birthday/new", verifyToken, grantAccess("createOwn", "church"), validateInput, postBirthday);
router.get("/birthday/all/:church", verifyToken, grantAccess("readOwn", "church"), validateParams, eventList);
router.get("/birthday/detail", verifyToken, grantAccess("readOwn", "church"), validateQuery, event);
router.put("/birthday/update", verifyToken, grantAccess("updateOwn", "church"), updateEvent);
router.delete("/birthday/delete", verifyToken, grantAccess("deleteOwn", "church"), validateQuery, deleteEvent);

export default router;
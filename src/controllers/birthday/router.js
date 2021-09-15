import express from "express";
import { grantAccess } from "../../middleware/access";
import { validateParams, validateQuery, validateInput } from "../../validation/birthday";
import { verifyToken } from "../../middleware/auth"
import { eventList, postBirthday, event, updateEvent, deleteEvent, searchEvent } from "./controller";


const router = express.Router();

router.post("/birthday/new", verifyToken, grantAccess("createOwn", "church"), validateInput, postBirthday);
router.get("/birthday/all/:church", verifyToken, grantAccess("readOwn", "church"), validateParams, eventList);
router.get("/birthday/detail", verifyToken, grantAccess("readOwn", "church"), validateQuery, event);
router.delete("/birthday/delete/:church/:eventId", verifyToken, grantAccess("deleteOwn", "church"), validateQuery, deleteEvent)
router.put("/birthday/update", verifyToken, grantAccess("updateOwn", "church"), updateEvent);
router.get("/birthday/search", verifyToken, grantAccess("readOwn", "church"), searchEvent)

export default router;
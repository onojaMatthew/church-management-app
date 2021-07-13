import express from "express";
import { churchDetails, churchList, createChurch, deleteChurch, updateChurch } from "./controller";


const router = express.Router();

router.post("/church/new", createChurch);
router.get("/church/all", churchList);
router.get("/church/detail/:churchId", churchDetails);
router.put("/church/update/:churchId", updateChurch);
router.delete("/church/delete/:churchId", deleteChurch);

export default router;
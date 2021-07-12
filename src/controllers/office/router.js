import express from "express";
import { create, deleteOffice, fetchOffice, fetchOfficeList, updateOffice } from "./controller";


const router = express.Router();

router.post("/office/new", create);
router.get("/office/all", fetchOfficeList);
router.get("/office/detail/:officeId", fetchOffice);
router.put("/office/update/:officeId", updateOffice);
router.delete("/office/delete/:officeId", deleteOffice);

export default router;
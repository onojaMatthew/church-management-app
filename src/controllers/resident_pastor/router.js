import express from "express";
import { verify } from "jsonwebtoken";
import { grantAccess } from "../../middleware/access";
import { create_residence_pastor, delete_pastor, pastor_detail, resident_pastor_list, update_detail } from "./controller";

const router = express.Router();

router.post("/pastor/new", verify, grantAccess("createAny", "super admin"), create_residence_pastor);
router.get("/pastor/all", verify, grantAccess("readAny", "super admin"), resident_pastor_list);
router.get("/pastor/details", verify, grantAccess("readOwn", "pastor"), pastor_detail);
router.put("/pastor/update", verify, grantAccess("updateOwn", "pastor"), update_detail);
router.delete("/pastor/delete", verify, grantAccess("deleteAny", "super admin"), delete_pastor);

export default router;
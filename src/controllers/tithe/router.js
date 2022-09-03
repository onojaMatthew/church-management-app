import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { tithe_validator } from "../../validation/birthday";
import { 
  create_tithe,
  get_tithe_list,
  get_tithe_details,
  update_tithe,
  tithe_search,
  tithe_filter,
  delete_tithe
} from "./controller";

const router = express.Router();

router.post("/tithe/new", verifyToken, grantAccess("createOwn", "branch church"), tithe_validator, create_tithe);
router.get("/tithe/all", verifyToken, grantAccess("readOwn", "branch church"), get_tithe_list);
router.get("/tithe/details", verifyToken, grantAccess("readOwn", "branch church"), get_tithe_details);
router.put("/tithe/update", verifyToken, grantAccess("updateOwn", "branch church"), update_tithe);
router.get("/tithe/search", verifyToken, grantAccess("readOwn", "branch church"), tithe_search);
router.get("/tithe/filter", verifyToken, grantAccess("readOwn", "branch church"), tithe_filter);
router.delete("/tithe/delete", verifyToken, grantAccess("deleteOwn", "branch church"), delete_tithe);

export default router;
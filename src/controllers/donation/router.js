import express from "express";
import { grantAccess } from "../../middleware/access";
import { verifyToken } from "../../middleware/auth";
import { donation_validator } from "../../validation/birthday";
import { 
  create_donation, 
  get_donation_details, 
  get_donation_list, 
  delete_donation, 
  update_donation, 
  donation_search, 
  donation_filter 
} from "./controller";

const router = express.Router();

router.post("/donation/new", verifyToken, grantAccess("createOwn", "branch church"), donation_validator, create_donation);
router.get("/donation/all", verifyToken, grantAccess("readOwn", "branch church"), get_donation_list);
router.get("/donation/details", verifyToken, grantAccess("readOwn", "branch church"), get_donation_details);
router.put("/donation/update", verifyToken, grantAccess("updateOwn", "branch church"), update_donation);
router.get("/donation/search", verifyToken, grantAccess("readOwn", "branch church"), donation_search);
router.get("/donation/filter", verifyToken, grantAccess("readOwn", "branch church"), donation_filter);
router.delete("/donation/delete", verifyToken, grantAccess("deleteOwn", "branch church"), delete_donation);

export default router;
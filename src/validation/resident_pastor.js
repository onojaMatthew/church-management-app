import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const check_resident_pastor = [
  check("first_name").isLength({ min: 3, max: 50 }).withMessage("First name must be at least 3 characters long"),
  check("last_name").isLength({ min: 3, max: 50 }).withMessage("Last name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("role").isMongoId().withMessage("Invalid role"),
  // check("image_url").isURL().withMessage("Invalid image"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
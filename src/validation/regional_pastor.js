import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const check_regional_pastor = [
  check("first_name").isString({ min: 3, max: 50 }).withMessage("First name must be at least 3 characters long"),
  check("last_name").isString({ min: 3, max: 50 }).withMessage("Last name must be at least 3 characters long"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("region").isString(),
  check("church").isMongoId().withMessage("Invalid church ID"),
  check("role").isMongoId().withMessage("Invalid role"),
  check("password").isStrongPassword(),
  check("image_url").isURL().withMessage("Invalid image image url"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
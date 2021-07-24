import { check, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const body_validator = [
  check("first_name").isString({ min: 3, max: 50 }).withMessage("First name must be at least 3 characters"),
  check("last_name").isString({ min: 3, max: 50 }).withMessage("Last name must be at least 3 characters"),
  check("email").isEmail({ min: 3, max: 50 }).withMessage("Invalid email address"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("church").isMongoId().withMessage("Church ID is not a valid ID"),
  check("city").isString({ min: 3, max: 50 }).withMessage(""),
  check("category").isMongoId().withMessage("Membership category ID is not a valid ID"),
  check("street").isString().withMessage("Church ID is not a valid ID"),
  check("state_of_origin").isString({ min: 3, max: 50 }).withMessage("State of origin must be at least 3 characters"),
  check("state").isString({ min: 3, max: 50 }).withMessage("State must be at least 3 characters"),
  check("occupation").isString({ min: 5, max: 50 }).withMessage("Occupation must be at least 5 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

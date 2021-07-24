import { check, param, validationResult } from "express-validator";
import { validation } from '../config/response';


export const new_admin_validator = [
  check("first_name").isString({ min: 3 }).withMessage("First name must be at least 3 characters"),
  check("last_name").isString({ min: 3 }).withMessage("Last name must be at least 3 characters"),
  check("email").isEmail().withMessage("Invalid email"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("password").isString({ min: 5 }).withMessage("Password must be at least 5 characters"),
  check("role").isMongoId().withMessage("Invalid role"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const loginValidator = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isString({ min: 5 }).withMessage("Password must be at least 5 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
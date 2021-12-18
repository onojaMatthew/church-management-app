import { check, validationResult, param } from "express-validator";
import { validation } from "../config/response";

export const new_role_validator = [
  check("name").isLength({ min: 3, max: 50 }).withMessage("Role name must be at least 3 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const role_update_validator = [
  check("name").isLength({ min: 3, max: 50 }).withMessage("Role name must be at least 3 characters long"),
  param("roleId").isMongoId().withMessage("Invalid role selected"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
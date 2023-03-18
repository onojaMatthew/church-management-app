import { body, check, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const body_validator = [
  body("churchId").isMongoId().withMessage("Church ID is not a valid ID"),
  body("name").notEmpty().withMessage("Category name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

export const param_validator = [
  param("churchId").isMongoId().withMessage("Church ID is not a valid ID"),
  param("id").isMongoId().withMessage("Office ID is not a valid ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const category_validator = [
  param("churchId").isMongoId().withMessage("Church ID is not a valid ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

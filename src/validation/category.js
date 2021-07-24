import { check, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const body_validator = [
  check("churchId").isMongoId().withMessage("Church ID is not a valid ID"),
  check("name").isString({ min: 3, max: 50 }).withMessage(""),
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

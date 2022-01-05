import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const fin_category_validator = [
  check("name").isIn([ "tithe", "thanksgiving", "special donation", "offering", "project" ]).withMessage("Invalid income type"),
  check("name").isLength({ min: 5, max: 50 }).withMessage("Income type must be at least 5 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
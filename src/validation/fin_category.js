import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const fin_category_validator = [
  check("church").isMongoId().withMessage("Invalid church ID"),
  check("name").isString({ min: 5 }).withMessage("Finance category name must be at least 5 characters long"),
  check("name").isIn(["tithe", "offering", "special donation", "thanksgiving" ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array())),
    next();
  }
]
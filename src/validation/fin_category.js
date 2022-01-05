import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const fin_category_validator = [
  check("name").isString().withMessage("Invalid income type"),
  check("name").isLength({ min: 6, max: 50 }),
  check("name").isIn(["tithe", "offering", "special donation", "thanksgiving" ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array())),
    next();
  }
]
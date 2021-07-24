import { check, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const newChurchValidator = [
  check("email").isEmail().withMessage("Invalid email"),
  check("city").isString({ min: 3, max: 50 }).withMessage("City name must be at least 3 characters"),
  check("state").isString({ min: 3, max: 50 }).withMessage("City name must be at least 3 characters"),
  check("street").isString({ min: 3, max: 50 }).withMessage("Street must be at least 3 characters"),
  check("bank_name").isString({ min: 3, max: 50 }).withMessage("Bank name must be at least 3 characters"),
  check("acct_no").isInt().withMessage("Invalid account number"),
  check("acct_no").isLength({ min: 10, max: 10 }).withMessage("Account number must be at least 10 digits"),
  check("acct_name").isString({ min: 3, max: 50 }).withMessage("Account must be at least 3 characters"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

export const validateChurch = [
  param("churchId").isMongoId().withMessage("Invalid church ID"),
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
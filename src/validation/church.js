import { check, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const newChurchValidator = [
  check("email").isEmail().withMessage("Invalid email"),
  check("city").isLength({ min: 3, max: 50 }).withMessage("City name must be at least 3 characters"),
  check("state").isLength({ min: 3, max: 50 }).withMessage("City name must be at least 3 characters"),
  check("street").isLength({ min: 3, max: 50 }).withMessage("Street must be at least 3 characters"),
  check("bank_name").isLength({ min: 3, max: 50 }).withMessage("Bank name must be at least 3 characters"),
  check("acct_no").isInt().withMessage("Invalid account number"),
  check("acct_no").isLength({ min: 10, max: 10 }).withMessage("Account number must be at least 10 digits"),
  check("acct_name").isLength({ min: 3, max: 50 }).withMessage("Account must be at least 3 characters"),
  check("password").isLength({ min: 6, max: 50 }).withMessage("Password must be at least 3 characters long"),
  check("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("resident_pastor_id").isMongoId().withMessage("Please select a resident pastor"),
  check("branch").isLength({ min: 5, max: 50 }).withMessage("Please provide a valid branch name"),
  check("role").isMongoId().withMessage("Please select a valid role"),
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
import { body, check, query, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const validateInput = [
  check("celebrants").isArray(),
  check("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

export const validateParams = [
  param("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

export const validateQuery = [
  query("eventId").isMongoId().withMessage("Invalid event ID"),
  query("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

export const baptism_validator = [
  body("first_name").isLength({ min: 3, max: 30 }).withMessage("First name must be at least 3 characters"),
  body("last_name").isLength({ min: 3, max: 30 }).withMessage("Last name must be at least 3 characters"),
  body("phone").isMobilePhone("NG-en").withMessage("Invalid phone number"),
  body("age").isInt({ min: 1, max: 150 }).withMessage("Please provide a valid age"),
  body("date").isDate().withMessage("Please provide a valid date"),
  body("administrating_pastor").isLength({ min: 3, max: 30 }).withMessage("Administrating pastor name is required"),
  body("venue").isLength({ min: 15, max: 150 }).withMessage("Provide a valid address"),
  body("teacher").isLength({ min: 3, max: 30 }).withMessage("Baptism teacher's name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
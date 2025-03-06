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
  body("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  body("age").isInt({ min: 1, max: 150 }).withMessage("Please provide a valid age"),
  body("date").isDate().withMessage("Please provide a valid date"),
  body("administrating_pastor").isLength({ min: 3, max: 30 }).withMessage("Administrating pastor name is required"),
  body("venue").isLength({ min: 15, max: 150 }).withMessage("Provide a valid address"),
  body("teacher").isLength({ min: 3, max: 30 }).withMessage("Baptism teacher's name is required"),
  body("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const dedication_validator = [
  body("first_name").isLength({ min: 3, max: 30 }).withMessage("First name must be at least 3 characters"),
  body("last_name").isLength({ min: 3, max: 30 }).withMessage("Last name must be at least 3 characters"),
  body("dob").isDate().withMessage("Please provide a valid date of birth"),
  body("date").isDate().withMessage("Please provide a valid date"),
  body("pastor").isLength({ min: 3, max: 30 }).withMessage("Pastor name is required"),
  body("family_name").isLength({ min: 3, max: 150 }).withMessage("Name must be at least 3 characters"),
  body("gender").isLength({ min: 4, max: 6 }).withMessage("Please select a gender type"),
  body("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const donation_validator = [
  body("first_name").isLength({ min: 3, max: 30 }).withMessage("First name must be at least 3 characters"),
  body("last_name").isLength({ min: 3, max: 30 }).withMessage("Last name must be at least 3 characters"),
  body("amount").isInt({ min: 100, }).withMessage("Enter a valid amount"),
  body("donation_type").isLength({ min: 5, max: 50 }).withMessage("Donation type must be at list 5 characters long"),
  body("donation_type").isString().withMessage("Invalid donation type"),
  body("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]

export const tithe_validator = [
  body("first_name").isLength({ min: 3, max: 30 }).withMessage("First name must be at least 3 characters"),
  body("last_name").isLength({ min: 3, max: 30 }).withMessage("Last name must be at least 3 characters"),
  body("amount").isInt({ min: 100 }).withMessage("Enter a valid amount"),
  body("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
]
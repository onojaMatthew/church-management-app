import { check, query, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const validateInput = [
  check("name").isString({ min: 3, max: 20 }).withMessage("Group name must be at least 3 characters"),
  check("church").isMongoId().withMessage("Invalid church ID"),
  check("preacher").isString({ min: 5, max: 50 }).withMessage("Preacher name must be at least 5 characters long"),
  check("topic").isString({ min: 5, max: 50 }).withMessage("Sermon topic is required and must be at least 5 characters"),
  check("bible_quote").isString({ min: 5, max: 50 }).withMessage("Bible quote is required and must be at least 5 characters"),
  check("men").isInt().withMessage("Number of men in attendance is required"),
  check("women").isInt().withMessage("Number of women in attendance is required"),
  check("children").isInt().withMessage("Number of children in attendance is required"),
  check("church").isMongoId().withMessage("Invalid church ID"),
  // check("start_time").matches(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/).withMessage("Service start time is required"),
  // check("end_time").matches(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/).withMessage("Service end time is required"),
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
  query("serviceId").isMongoId().withMessage("Invalid service ID"),
  query("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];
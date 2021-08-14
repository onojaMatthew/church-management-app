import { check, query, param, validationResult } from "express-validator";
import { validation } from "../config/response";

export const validateInput = [
  check("name").isString({ min: 3, max: 20 }).withMessage("Group name must be at least 3 characters"),
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
  query("groupId").isMongoId().withMessage("Invalid group ID"),
  query("church").isMongoId().withMessage("Invalid church ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];
import { body, validationResult } from "express-validator";
import { validation } from "../config/response";

export const body_validator = [
  body("first_name").isLength({ min: 3, max: 50 }).withMessage("First name must be at least 3 characters"),
  body("last_name").isLength({ min: 3, max: 50 }).withMessage("Last name must be at least 3 characters"),
  body("email").isEmail({ min: 3, max: 50 }).withMessage("Invalid email address"),
  body("phone").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  body("church").isMongoId().withMessage("Church ID is not a valid ID"),
  body("city").isLength({ min: 3, max: 50 }).withMessage("City must be at least 3 characters"),
  body("category").isMongoId().withMessage("Membership category is required"),
  body("street").isLength({ min: 3, max: 50 }).withMessage("Street name is required"),
  body("state_of_origin").isLength({ min: 3, max: 50 }).withMessage("State of origin must be at least 3 characters"),
  body("state").isLength({ min: 3, max: 50 }).withMessage("State must be at least 3 characters"),
  body("occupation").isLength({ min: 5, max: 50 }).withMessage("Occupation must be at least 5 characters"),
  body("marital_status").isIn([ "married", "single", "devoice" ]).withMessage("Please select a valid marital status"),
  body("dob").isDate().withMessage("Invalid date of birth"),
  body("sex").isIn([ "female", "male" ]).withMessage("Select a gender"),
  body("membershipGroup").isMongoId().withMessage("Please select a membership group"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];
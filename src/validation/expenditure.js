import { check, validationResult } from "express-validator";
import { validation } from "../config/response";

export const validateInput = [
  check("cost").isInt().withMessage("Invalid entry for cost of item"),
  check("item").isString({ min: 3, max: 30 }).withMessage("Item name must be at least 3 charaters long"),
  check("unit_price").isInt({ min: 10 }).withMessage("Invalid entry for Unit Price"),
  check("quantity").isInt({ min: 1 }).withMessage("Invalid entry for Quantity"),
  check("authorized_by").isString({ min: 3, max: 50 }).withMessage("Name of approving pastor is too short"),
  check("purchased_by").isString({ min: 3, max: 50 }).withMessage("Purchaser's name is too short"),
  // check("time").isDate().withMessage("Date is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(validation(errors.array()));
    next();
  }
];

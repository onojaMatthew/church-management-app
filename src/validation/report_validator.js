import { body, validationResult } from "express-validator";
import { validation } from "../config/response";

export const report_validator = [
  body("")
]
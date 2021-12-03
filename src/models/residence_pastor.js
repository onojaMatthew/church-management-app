import { Schema } from "mongoose";

export const residentPastorSchema = new Schema({
  first_name: { type: String, required: [ true, "First name is required"]},
  last_name: { type: String, required: [ true, "Last name is required"]},
  email: { type: String, unique: [ true, "Email already taken" ], required: [ true, "First name is required"]},
  phone: { type: String, required: [ true, "Phone number is required" ]},
}, { timestamps: true });
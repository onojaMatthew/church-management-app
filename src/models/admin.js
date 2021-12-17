import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const adminSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  role: { 
    role_id: {type: ObjectId, ref: "Role"},
    role_name: { type: String }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  church_logo: { type: String, default: "" },
  image_url: { type: String, default: "" },
}, { timestamps: true });

import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const memberSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  church: { type: ObjectId, ref: "Church" },
  category: { type: ObjectId, ref: "MembershipCategory" },
  address: {
    city: { type: String },
    street: { type: String },
    state: { type: String }
  },
  state_of_origin: { type: String },
  office: { type: ObjectId, ref: "Office" },
  occupation: { type: String },
  dob: { type: Date },
  marital_status: { type: String },
}, { timestamps: true });

// / 
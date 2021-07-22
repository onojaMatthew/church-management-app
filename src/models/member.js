import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const memberSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  church: { type: ObjectId, ref: "Church" },
  address: {
    city: { type: String },
    street: { type: String },
    state: { type: String }
  },
  state_of_origin: { type: String },
  occupation: { type: String }
}, { timestamps: true });

// / category: { type: ObjectId, ref: "MembershipCategory" },
import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const memberSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  phone: { type: String },
  category: { type: ObjectId, ref: "MembershipCategory" },
  church: { type: ObjectId, ref: "Church" },
  address: {
    city: { type: String },
    street: { type: String },
    state: { type: String }
  },
  state_of_origin: { type: String },
  occupation: { type: String }
}, { timestamps: true });

export const Member = mongoose.model("Member", memberSchema);
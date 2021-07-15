import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const churchSchema = new Schema({
  address: {
    city: { type: String },
    state: { type: String },
    street: { type: String }
  },
  email: { type: String, unique: true },
  phone: { type: String },
  domain_name: { type: String },
  bank: {
    acct_no: { type: Number },
    bank_name: { type: String },
    acct_name: { type: String }
  },
  role: {
    role_id: { type: ObjectId, ref: "Role" },
    role_name: { type: String },
  },
  officers: [{ type: ObjectId, ref: "Officer" }],
  office: [{ type: ObjectId, ref: "Office" }],
  members: [ {type: ObjectId, ref: "Member" }],
  password: { type: String },
}, { timestamps: true });

export const Church = mongoose.model("Church", churchSchema);
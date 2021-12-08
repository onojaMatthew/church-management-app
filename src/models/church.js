import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

export const churchSchema = new Schema({
  address: {
    city: { type: String },
    state: { type: String },
    street: { type: String }
  },
  branch: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  subdomain_name: { type: String },
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
  members: [{type: ObjectId, ref: "Member" }],
  head_pastor: { 
    _id: { type: ObjectId },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    default: {}
  },
  regional_pastor: {
    _id: { type: ObjectId },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  password: { type: String },
  zonal_pastor: { 
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone: { type: String },
    _id: { type: ObjectId },
  },
}, { timestamps: true });

churchSchema.plugin(mongoosePaginate);

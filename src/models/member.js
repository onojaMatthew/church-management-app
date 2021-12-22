import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  membershipCategory: { type: String, default: "" },
  dob: { type: Date },
  sex: { type: String, enum: [ "male", "female" ]},
  marital_status: { type: String },
  group: [{
    name: String,
    _id: ObjectId
  }]
}, { timestamps: true });

memberSchema.plugin(mongoosePaginate);
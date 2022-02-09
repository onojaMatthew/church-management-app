import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { ObjectId } = mongoose;

export const dedicationSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  family_name: { type: String },
  dob: { type: Date },
  pastor: { type: String },
  other_name: { type: String },
  date: { type: Date },
  church: { type: ObjectId },
  gender: { type: String },
}, { timestamps: true });

dedicationSchema.plugin(mongoosePaginate);
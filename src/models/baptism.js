import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { ObjectId } = mongoose;

export const baptismSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone: { type: String },
  venue: { type: String },
  teacher: { type: String },
  age: { type: Number },
  date: { type: Date },
  church: { type: ObjectId },
  administrating_pastor: { type: String },
}, { timestamps: true });

baptismSchema.plugin(mongoosePaginate);
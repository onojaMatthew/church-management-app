import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const titheSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  amount: { type: Number },
  month: { type: String },
  church: { type: String }
}, { timestamps: true });

titheSchema.plugin(mongoosePaginate);
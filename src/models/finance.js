import { Schema } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

export const financeSchema = new Schema({
  category: { type: String },
  amount: { type: Number, },
  service_type: { type: String },
  church: { type: String },
  date: { type: Date },
  created_by: { type: String },
}, { timestamps: true });

financeSchema.plugin(mongoosePagination);

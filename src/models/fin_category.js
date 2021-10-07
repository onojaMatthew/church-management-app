import { Schema } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

export const fcategorySchema = new Schema({
  church: { type: String },
  name: { type: String },
  service_type: { type: String},
}, { timestamps: true });

fcategorySchema.plugin(mongoosePagination);
import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const donationSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  amount: { type: Number },
  donation_type: { type: String },
  church: { type: String }
}, { timestamps: true });

donationSchema.plugin(mongoosePaginate);

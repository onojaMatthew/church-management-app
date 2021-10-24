import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const expenditureSchema = new Schema({
  cost: { type: Number, default: 0 },
  item: { type: String },
  unit_price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  authorized_by: { type: String },
  purchased_by: { type: String },
  time: { type: Date, default: Date.now() },
  church: { type: Object, }
}, { timestamps: true });


expenditureSchema.plugin(mongoosePaginate);
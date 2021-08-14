import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

export const serviceSchema = new Schema({
  name: { type: String },
  preacher: { type: String },
  topic: { type: String },
  bible_quote: { type: String },
  attendance: {
    men: { type: Number, default: 0 },
    women: { type: Number, default: 0 },
    children: { type: Number, default: 0 }
  },
  start_time: { type: Date },
  end_time: { type: Date }
}, { timestamps: true });

serviceSchema.plugin(mongoosePaginate);
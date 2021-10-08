import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

export const fcategorySchema = new Schema({
  church: { type: String },
  name: { type: String },
}, { timestamps: true });

fcategorySchema.plugin(mongoosePaginate);

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

export const birthdaySchema = new Schema({
  first_name: { type: String }, 
  last_name: { type: String },
  birth_date: { type: Date },
  sex: { type: String, enum: [ "male", "female" ] },
  phone: { type: String },
  email: { type: String },
  venue: { type: String },
}, { timestamps: true });

birthdaySchema.plugin(mongoosePaginate);
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

export const birthdaySchema = new Schema({
  celebrants: [{ 
    first_name: { type: String }, 
    last_name: { type: String },
    birth_date: { type: Date },
    sex: { type: String, enum: [ "male", "female" ] }
  }],
}, { timestamps: true });

birthdaySchema.plugin(mongoosePaginate);
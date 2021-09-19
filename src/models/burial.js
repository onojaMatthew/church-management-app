import { Schema } from "mongoose";

export const burialSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  image_url: { type: String },
  death_date: { type: Date },
  age: { type: Number },
  officiating_pastor: { type: String },
  position: { type: String },
  burial_venue: { type: String },
}, { timestamps: true });
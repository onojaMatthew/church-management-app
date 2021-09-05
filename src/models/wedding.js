import mongoose from "mongoose";

const { Schema } = mongoose;

export const weddingSchema = new Schema({
  groom: {
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String },
  },
  bride: {
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String },
  },
  wedding_picture: { type: String },
  lead_pastor: { type: String },
  venue: { type: String },
  date: { type: Date }
}, { timestamps: true });
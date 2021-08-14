import mongoose from "mongoose";

const { Schema } = mongoose;

export const groupSchema = new Schema({
  name: { type: String },
  church: { type: String }
}, { timestamps: true });
import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const membershipCategorySchema = new Schema({
  name: { type: String },
  churchId: { type: ObjectId, ref: "Church" }
}, { timestamps: true });
import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const officeSchema = new Schema({
  name: { type: String },
  churchId: { type: ObjectId, ref: "Church" },
});
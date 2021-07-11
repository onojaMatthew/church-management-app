import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const officeSchema = new Schema({
  name: { type: String },
  churchId: { type: ObjectId, ref: "Church" },
});

export const Office = mongoose.model("Office", officeSchema);
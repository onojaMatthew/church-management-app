import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const membershipCategorySchema = new Schema({
  name: { type: String },
  churchId: { type: ObjectId, ref: "Church" }
}, { timestamps: true });

export const MembershipCategory = mongoose.model("MembershipCategory", membershipCategorySchema);
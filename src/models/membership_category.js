import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

const membershipCategorySchema = new Schema({
  name: { type: String },
  churchId: { type: ObjectId, ref: "Church" }
}, { timestamps: true });

membershipCategorySchema.plugin(mongoosePaginate);

export { membershipCategorySchema };
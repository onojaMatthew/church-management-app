import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

export const reportSchema = new Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  to: { type: ObjectId },
  coordinator: {
    _id: ObjectId,
    name: String,
    email: String,
    phone: String,
  },
  coordinator_remark: { type: String, default: "" },
  coordinator_approval: { type: Boolean, default: false },
  gco_approval_remark: {
    approved: { type: Boolean, default: false },
    remark: { type: String, default: "" },
  },
  church: { 
    _id: ObjectId,
    branch: String,
    head_pastor: String,
    email: String,
    phone: String
  }
}, { timestamps: true });

reportSchema.plugin(mongoosePaginate);
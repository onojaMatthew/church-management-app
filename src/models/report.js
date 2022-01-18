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
  regional_pastor: {
    _id: ObjectId,
    name: String,
    email: String,
    phone: String,
  },
  regional_pastor_remark: { type: String, default: "" },
  regional_pastor_approval: { type: Boolean, default: false },
  coordinator_approval: { type: Boolean, default: false },
  gco_approval_remark: {
    approved: { type: Boolean, default: false },
    remark: { type: String, default: "" },
  },
  to_zonal_pastor: { type: Boolean },
  to_regional_pastor: { type: Boolean },
  to_general_overseer: { type: Boolean },
  church: { 
    _id: ObjectId,
    branch: String,
    head_pastor: { 
      first_name: String,
      last_name: String,
    },
    email: String,
    phone: String,
  },
  attachment: { type: String }
}, { timestamps: true });

reportSchema.plugin(mongoosePaginate);
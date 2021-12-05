import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, ObjectId } = mongoose;

export const zonalCoordinatorSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  churches: [{ 
    _id: Object,
    branch: String,
    phone: String,
    email: String,
    head_pastor: String
  }],
  role: { 
    role_id: { type: ObjectId, ref: "Role" },
    role_name: { type: String }
  },
  password: { type: String }
}, { timestamps: true });

zonalCoordinatorSchema.plugin(mongoosePaginate);
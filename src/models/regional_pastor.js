import { Schema, ObjectId } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const regionalPastorSchema = new Schema({
  first_name: { type: String, required: [ true, "First name is required"]},
  last_name: { type: String, required: [ true, "Last name is required"]},
  email: { type: String, unique: [ true, "Email already taken" ], required: [ true, "First name is required"]},
  phone: { type: String, required: [ true, "Phone number is required" ]},
  region: { type: String, },
  churches: [{ 
    _id: Object,
    branch: String,
    phone: String,
    email: String,
    head_pastor: { 
      first_name: String, 
      last_name: String
    },
    zonal_pastor: String
  }],
  role: { 
    role_id: { type: ObjectId, ref: "Role" },
    role_name: { type: String }
  },
  password: { type: String },
  image_url: { type: String }
}, { timestamps: true });

regionalPastorSchema.plugin(mongoosePaginate);
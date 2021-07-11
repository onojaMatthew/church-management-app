import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const adminSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  role: { 
    role_id: {type: ObjectId, ref: "Role"},
    name: { type: String }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

const Admin = mongoose.model("Admin",  adminSchema);

export default Admin;
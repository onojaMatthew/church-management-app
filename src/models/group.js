import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

export const groupSchema = new Schema({
  name: { type: String },
  church: { type: String },
  members: [{
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    dob: Date,
    _id: ObjectId
  }]
}, { timestamps: true });
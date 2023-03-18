import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String },
}, { timestamps: true });

roleSchema.plugin(mongoosePaginate);

export { roleSchema };
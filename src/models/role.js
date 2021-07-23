import mongoose from 'mongoose';

const { Schema } = mongoose;

export const roleSchema = new Schema({
    name: { type: String },
}, { timestamps: true });
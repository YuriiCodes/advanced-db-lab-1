import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date,
    updatedBy: String
});

export  const Category = mongoose.model('Category', categorySchema);


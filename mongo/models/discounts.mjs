import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    id: String,
    productId: { type: mongoose.Schema.Types.String, ref: 'Product' },
    discountPercent: Number,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date,
    updatedBy: String
});

export const Discount = mongoose.model('Discount', discountSchema);

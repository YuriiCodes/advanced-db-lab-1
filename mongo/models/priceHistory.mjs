import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
    id: String,
    productId: { type: mongoose.Schema.Types.String, ref: 'Product' },
    oldPrice: Number,
    newPrice: Number,
    changeDate: Date,
    createdAt: Date,
    updatedAt: Date,
    updatedBy: String
});

export const PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);

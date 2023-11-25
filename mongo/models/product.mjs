import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    categoryId: { type: mongoose.Schema.Types.String, ref: 'Category' },
    createdAt: Date,
    updatedAt: Date,
    updatedBy: String,
    discounts: [{ type: mongoose.Schema.Types.String, ref: 'Discount' }],
    priceHistories: [{ type: mongoose.Schema.Types.String, ref: 'PriceHistory' }]
});

export const Product = mongoose.model('Product', productSchema);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Category} from "./models/category.mjs";
import {Product} from "./models/product.mjs";
import {Discount} from "./models/discounts.mjs";
import {PriceHistory} from "./models/priceHistory.mjs";

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DATABASE_URL;

if (!MONGO_DB_URL) {
    throw new Error('You must provide a MongoDB URI');
}


async function deleteRecords() {

    try {
        await mongoose.connect(MONGO_DB_URL);
    } catch (err) {
        console.log(`Error connecting to mongo: ${err}`);
        process.exit(1);
    }

    const timeBefore = new Date();
    // Fetch and delete 1000 Category records
    const categoryIds = await Category.find().limit(1000).select('_id');
    await Category.deleteMany({ _id: { $in: categoryIds.map(doc => doc._id) } });

    // Fetch and delete 1000 Product records
    const productIds = await Product.find().limit(1000).select('_id');
    await Product.deleteMany({ _id: { $in: productIds.map(doc => doc._id) } });

    // Fetch and delete 1000 Discount records
    const discountIds = await Discount.find().limit(1000).select('_id');
    await Discount.deleteMany({ _id: { $in: discountIds.map(doc => doc._id) } });

    // Fetch and delete 1000 PriceHistory records
    const priceHistoryIds = await PriceHistory.find().limit(1000).select('_id');
    await PriceHistory.deleteMany({ _id: { $in: priceHistoryIds.map(doc => doc._id) } });

    const timeAfter = new Date();
    console.log(`Time taken: ${timeAfter - timeBefore}ms`);
}

deleteRecords().then(() => {
    console.log('Records deleted');
    void mongoose.disconnect();
}).catch(error => {
    console.error('Error deleting records:', error);
    void mongoose.disconnect();
});

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




async function readRecords() {
    try {
        await mongoose.connect(MONGO_DB_URL);
    } catch (err) {
        console.log(`Error connecting to mongo: ${err}`);
        process.exit(1);
    }

    const timeBefore = new Date();
    // Read 1000 Category records
    const categories = await Category.find().limit(1000);
    console.log('Categories:', categories);

    // Read 1000 Product records
    const products = await Product.find().limit(1000);
    console.log('Products:', products);

    // Read 1000 Discount records
    const discounts = await Discount.find().limit(1000);
    console.log('Discounts:', discounts);

    // Read 1000 PriceHistory records
    const priceHistories = await PriceHistory.find().limit(1000);
    console.log('Price Histories:', priceHistories);

    const timeAfter = new Date();
    console.log(`Time taken: ${timeAfter - timeBefore}ms`);
}

readRecords().then(() => {
    console.log('Records read');
    mongoose.disconnect();
}).catch(error => {
    console.error('Error reading records:', error);
    mongoose.disconnect();
});
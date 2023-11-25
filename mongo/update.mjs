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



async function updateRecords() {
    try {
        await mongoose.connect(MONGO_DB_URL);
    } catch (err) {
        console.log(`Error connecting to mongo: ${err}`);
        process.exit(1);
    }

    const timeBefore = new Date();

    // Update 1000 Category records
    const categoryIds = await Category.find().limit(1000).select('_id');
    for (const id of categoryIds) {
        await Category.updateOne({ _id: id }, {
            $set: {
                // Set fields to be updated here
                updatedBy: 'UpdatedSeeder',
                updatedAt: new Date()
                // Other fields to be updated
            }
        });
    }

    // Update 1000 Product records
    const productIds = await Product.find().limit(1000).select('_id');
    for (const id of productIds) {
        await Product.updateOne({ _id: id }, {
            $set: {
                // Set fields to be updated here
                updatedBy: 'UpdatedSeeder',
                updatedAt: new Date()
                // Other fields to be updated
            }
        });
    }

    // Update 1000 Discount records
    const discountIds = await Discount.find().limit(1000).select('_id');
    for (const id of discountIds) {
        await Discount.updateOne({ _id: id }, {
            $set: {
                // Set fields to be updated here
                updatedBy: 'UpdatedSeeder',
                updatedAt: new Date()
                // Other fields to be updated
            }
        });
    }

    // Update 1000 PriceHistory records
    const priceHistoryIds = await PriceHistory.find().limit(1000).select('_id');
    for (const id of priceHistoryIds) {
        await PriceHistory.updateOne({ _id: id }, {
            $set: {
                // Set fields to be updated here
                updatedBy: 'UpdatedSeeder',
                updatedAt: new Date()
                // Other fields to be updated
            }
        });
    }

    const timeAfter = new Date()
    console.log(`Updated 1000 records in ${timeAfter - timeBefore}ms`);
}

updateRecords().then(() => {
    console.log('Records updated');
    void mongoose.disconnect();
}).catch(error => {
    console.error('Error updating records:', error);
    void mongoose.disconnect();
});

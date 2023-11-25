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



const bootstrap = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);
    } catch (err) {
        console.log(`Error connecting to mongo: ${err}`);
        process.exit(1);
    }
    async function createRecords() {
        const timeBefore = new Date();

        for (let i = 1; i <= 1000; i++) {
            // Create a category
            const category = new Category({
                name: `Category ${i}`,
                description: `Sample category ${i}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                updatedBy: "Seeder"
            });
            await category.save();

            // Create a product
            const product = new Product({
                name: `Product ${i}`,
                description: `Sample product ${i}`,
                price: Math.random() * 100, // Random price
                categoryId: category.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                updatedBy: "Seeder"
            });
            await product.save();

            // Create a discount
            const discount = new Discount({
                productId: product.id,
                discountPercent: Math.floor(Math.random() * 30), // Random discount percent
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                createdAt: new Date(),
                updatedAt: new Date(),
                updatedBy: "Seeder"
            });
            await discount.save();

            // Create a price history
            const oldPrice = Math.random() * 100;
            const newPrice = oldPrice - (oldPrice * (discount.discountPercent / 100));
            const priceHistory = new PriceHistory({
                productId: product.id,
                oldPrice: oldPrice,
                newPrice: newPrice,
                changeDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                updatedBy: "Seeder"
            });
            await priceHistory.save();
        }

        const timeAfter = new Date()
        console.log(`Created 1000 records in ${timeAfter - timeBefore}ms`);
    }

    createRecords().then(() => {
        mongoose.disconnect();
    }).catch(error => {
        console.error('Error creating records:', error);
        mongoose.disconnect();
    });
}


void bootstrap();


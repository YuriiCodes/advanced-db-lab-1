import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const timeBefore = Date.now();
    // Read 1000 category records
    const categories = await prisma.category.findMany({
        take: 1000
        // Add any additional filters or sorting here if necessary
    });
    console.log('Categories:', categories);

    // Read 1000 product records
    const products = await prisma.product.findMany({
        take: 1000
        // Add any additional filters or sorting here if necessary
    });
    console.log('Products:', products);

    // Read 1000 discount records
    const discounts = await prisma.discount.findMany({
        take: 1000
        // Add any additional filters or sorting here if necessary
    });
    console.log('Discounts:', discounts);

    // Read 1000 price history records
    const priceHistories = await prisma.priceHistory.findMany({
        take: 1000
        // Add any additional filters or sorting here if necessary
    });
    console.log('Price Histories:', priceHistories);

    const timeAfter = Date.now();
    console.log(`Time elapsed: ${timeAfter - timeBefore}ms`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

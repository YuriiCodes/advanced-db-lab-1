import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Retrieve the first 1000 IDs for each entity
    const categories = await prisma.category.findMany({ take: 1000, select: { id: true } });
    const products = await prisma.product.findMany({ take: 1000, select: { id: true, price: true } });
    const discounts = await prisma.discount.findMany({ take: 1000, select: { id: true, discountPercent: true } });
    const priceHistories = await prisma.priceHistory.findMany({ take: 1000, select: { id: true, oldPrice: true } });


    const timeBefore = Date.now();
    // Update price histories
    for (const history of priceHistories) {
        await prisma.priceHistory.update({
            where: { id: history.id },
            data: {
                // Update data here
                newPrice: history.oldPrice * 2,
                updatedBy: 'UpdatedSeeder'
                // Other fields to be updated
            }
        });
    }

    // Update discounts
    for (const discount of discounts) {
        await prisma.discount.update({
            where: { id: discount.id },
            data: {
                // Update data here
                discountPercent: discount.discountPercent * 2,
                updatedBy: 'UpdatedSeeder'
                // Other fields to be updated
            }
        });
    }

    // Update products
    for (const product of products) {
        await prisma.product.update({
            where: { id: product.id },
            data: {
                // Update data here
                price: product.price * 2,
                updatedBy: 'UpdatedSeeder'
                // Other fields to be updated
            }
        });
    }

    // Update categories
    for (const category of categories) {
        await prisma.category.update({
            where: { id: category.id },
            data: {
                description: `Updated description for ${category.id}`,
                updatedBy: 'UpdatedSeeder'

            }
        });
    }

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

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Retrieve the first 1000 IDs for each entity
    const categories = await prisma.category.findMany({ take: 1000, select: { id: true } });
    const products = await prisma.product.findMany({ take: 1000, select: { id: true } });
    const discounts = await prisma.discount.findMany({ take: 1000, select: { id: true } });
    const priceHistories = await prisma.priceHistory.findMany({ take: 1000, select: { id: true } });


    const timeBefore = Date.now();
    // Delete price histories
    for (const history of priceHistories) {
        await prisma.priceHistory.delete({ where: { id: history.id } });
    }

    // Delete discounts
    for (const discount of discounts) {
        await prisma.discount.delete({ where: { id: discount.id } });
    }

    // Delete products
    for (const product of products) {
        await prisma.product.delete({ where: { id: product.id } });
    }

    // Delete categories
    for (const category of categories) {
        await prisma.category.delete({ where: { id: category.id } });
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

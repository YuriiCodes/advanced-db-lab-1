import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const timeBefore = Date.now();
    for (let i = 1; i <= 1000; i++) {
        // Create categories
        const category = await prisma.category.create({
            data: {
                name: `Category ${i}`,
                description: `Sample category ${i}`,
                updatedBy: "Seeder"
            }
        });

        // Create products
        const product = await prisma.product.create({
            data: {
                name: `Product ${i}`,
                description: `Sample product ${i}`,
                price: i,
                category: { connect: { id: category.id } },
                updatedBy: "Seeder"
            }
        });

        // Create discounts
        const discount = await prisma.discount.create({
            data: {
                product: { connect: { id: product.id } },
                discountPercent: i,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                updatedBy: "Seeder"
            }
        });

        // Create price history
        const oldPrice = i;
        const newPrice = oldPrice - (oldPrice * (discount.discountPercent / 100));

        const priceHistory = await prisma.priceHistory.create({
            data: {
                product: { connect: { id: product.id } },
                oldPrice: oldPrice,
                newPrice: newPrice,
                changeDate: new Date(),
                updatedBy: "Seeder"
            }
        });
    }

    const timeAfter = Date.now();
    console.log(`Execution time: ${timeAfter - timeBefore}ms`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

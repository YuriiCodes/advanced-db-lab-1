const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const contactInfo1 = await prisma.contactInfo.create({
        data: {
            email: "contact1@example.com",
            phone: "1234567890",
            note: "Sample contact info 1",
            updatedBy: "Seeder"
        }
    });

    const contactInfo2 = await prisma.contactInfo.create({
        data: {
            email: "contact2@example.com",
            phone: "0987654321",
            note: "Sample contact info 2",
            updatedBy: "Seeder"
        }
    });

    const user1 = await prisma.user.create({
        data: {
            username: "user1",
            passwordHashed: "hashedpassword1",
            contactInfo: {
                connect: { id: contactInfo1.id }
            },
            updatedBy: "Seeder"
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: "user2",
            passwordHashed: "hashedpassword2",
            contactInfo: {
                connect: { id: contactInfo2.id }
            },
            updatedBy: "Seeder"
        }
    });

    const category1 = await prisma.category.create({
        data: {
            name: "Category 1",
            description: "Sample category 1",
            updatedBy: "Seeder"
        }
    });

    const category2 = await prisma.category.create({
        data: {
            name: "Category 2",
            description: "Sample category 2",
            updatedBy: "Seeder"
        }
    });

    const product1 = await prisma.product.create({
        data: {
            name: "Product 1",
            description: "Sample product 1",
            price: 10.99,
            category: { connect: { id: category1.id } },
            updatedBy: "Seeder"
        }
    });

    const product2 = await prisma.product.create({
        data: {
            name: "Product 2",
            description: "Sample product 2",
            price: 12.99,
            category: { connect: { id: category2.id } },
            updatedBy: "Seeder"
        }
    });

    // ... previous code ...

    const orderStatus1 = await prisma.orderStatus.create({
        data: {
            name: "Processed",
            description: "Order has been processed",
        }
    });

    const orderStatus2 = await prisma.orderStatus.create({
        data: {
            name: "Shipped",
            description: "Order has been shipped",
        }
    });

    const order1 = await prisma.order.create({
        data: {
            user: { connect: { id: user1.id } },
            status: { connect: { id: orderStatus1.id } },
            updatedBy: "Seeder"
        }
    });

    const order2 = await prisma.order.create({
        data: {
            user: { connect: { id: user2.id } },
            status: { connect: { id: orderStatus2.id } },
            updatedBy: "Seeder"
        }
    });

    const orderProduct1 = await prisma.orderProduct.create({
        data: {
            order: { connect: { id: order1.id } },
            product: { connect: { id: product1.id } }
        }
    });

    const orderProduct2 = await prisma.orderProduct.create({
        data: {
            order: { connect: { id: order2.id } },
            product: { connect: { id: product2.id } }
        }
    });

    const review1 = await prisma.review.create({
        data: {
            product: { connect: { id: product1.id } },
            user: { connect: { id: user1.id } },
            rating: 5,
            comment: "Great product!"
        }
    });

    const review2 = await prisma.review.create({
        data: {
            product: { connect: { id: product2.id } },
            user: { connect: { id: user2.id } },
            rating: 4,
            comment: "Good product!"
        }
    });

    const cart1 = await prisma.cart.create({
        data: {
            user: { connect: { id: user1.id } },
            product: { connect: { id: product1.id } },
            quantity: 2
        }
    });

    const cart2 = await prisma.cart.create({
        data: {
            user: { connect: { id: user2.id } },
            product: { connect: { id: product2.id } },
            quantity: 1
        }
    });

    const address1 = await prisma.address.create({
        data: {
            user: { connect: { id: user1.id } },
            street: "123 Main St",
            city: "CityOne",
            zipCode: "12345",
            country: "CountryA",
            updatedBy: "Seeder"
        }
    });

    const address2 = await prisma.address.create({
        data: {
            user: { connect: { id: user2.id } },
            street: "456 Elm St",
            city: "CityTwo",
            zipCode: "67890",
            country: "CountryB",
            updatedBy: "Seeder"
        }
    });

    const payment1 = await prisma.payment.create({
        data: {
            order: { connect: { id: order1.id } },
            amount: 100.50,
            paymentMethod: "Credit Card"
        }
    });

    const payment2 = await prisma.payment.create({
        data: {
            order: { connect: { id: order2.id } },
            amount: 50.25,
            paymentMethod: "Debit Card"
        }
    });

// ... previous code ...

    const discount1 = await prisma.discount.create({
        data: {
            product: { connect: { id: product1.id } },
            discountPercent: 10,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
            updatedBy: "Seeder"
        }
    });

    const discount2 = await prisma.discount.create({
        data: {
            product: { connect: { id: product2.id } },
            discountPercent: 5,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 15)),
            updatedBy: "Seeder"
        }
    });

    const shipping1 = await prisma.shipping.create({
        data: {
            order: { connect: { id: order1.id } },
            deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            sendDate: new Date(),
            addressId: address1.id
        }
    });

    const shipping2 = await prisma.shipping.create({
        data: {
            order: { connect: { id: order2.id } },
            deliveryDate: new Date(new Date().setDate(new Date().getDate() + 10)),
            sendDate: new Date(),
            addressId: address2.id
        }
    });

    const supplier1 = await prisma.supplier.create({
        data: {
            name: "SupplierA",
            description: "Supplier A Description",
            contactInfo: { create: { email: "supplierA@email.com", phone: "123-456-7890", note: "Main Supplier", updatedBy: "Seeder" } },
            updatedBy: "Seeder"
        }
    });

    const supplier2 = await prisma.supplier.create({
        data: {
            name: "SupplierB",
            description: "Supplier B Description",
            contactInfo: { create: { email: "supplierB@email.com", phone: "987-654-3210", note: "Secondary Supplier", updatedBy: "Seeder" } },
            updatedBy: "Seeder"
        }
    });

    const productSupplier1 = await prisma.productSupplier.create({
        data: {
            product: { connect: { id: product1.id } },
            supplier: { connect: { id: supplier1.id } }
        }
    });

    const productSupplier2 = await prisma.productSupplier.create({
        data: {
            product: { connect: { id: product2.id } },
            supplier: { connect: { id: supplier2.id } }
        }
    });


    const warehouse1 = await prisma.warehouse.create({
        data: {
            name: "WarehouseA",
            addressId: address1.id,
            updatedBy: "Seeder",
        }
    });

    const warehouse2 = await prisma.warehouse.create({
        data: {
            name: "WarehouseB",
            addressId: address2.id,
            updatedBy: "Seeder"
        }
    });

    const priceHistory1 = await prisma.priceHistory.create({
        data: {
            product: { connect: { id: product1.id } },
            oldPrice: 100.0,
            newPrice: 90.0,
            changeDate: new Date(),
            updatedBy: "Seeder"
        }
    });

    const priceHistory2 = await prisma.priceHistory.create({
        data: {
            product: { connect: { id: product2.id } },
            oldPrice: 50.0,
            newPrice: 47.5,
            changeDate: new Date(),
            updatedBy: "Seeder"
        }
    });

    const orderHistory1 = await prisma.orderHistory.create({
        data: {
            order: { connect: { id: order1.id } },
            oldStatusId: orderStatus1.id,
            newStatusId: orderStatus2.id,
            updatedBy: "Seeder"
        }
    });

    const orderHistory2 = await prisma.orderHistory.create({
        data: {
            order: { connect: { id: order2.id } },
            oldStatusId: orderStatus2.id,
            newStatusId: orderStatus1.id,
            updatedBy: "Seeder"
        }
    });



}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

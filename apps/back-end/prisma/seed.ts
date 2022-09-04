import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('seeding categories...');
  const dummyCategoriesNames = ['X', 'Y', 'Z'];
  for (const [index, name] of dummyCategoriesNames.entries()) {
    await prisma.category.create({
      data: {
        id: index + 1,
        name: `Category ${name}`,
      },
    });
  }

  console.log('seeding products...');
  const dummyProductsNames = [
    {
      name: 'A',
      category: 3,
    },
    {
      name: 'B',
      category: 2,
    },
    {
      name: 'C',
      category: 1,
      disabled: true,
    },
    {
      name: 'D',
      category: 3,
    },
    {
      name: 'E',
      category: 1,
    },
  ];
  for (const [index, product] of dummyProductsNames.entries()) {
    await prisma.product.create({
      data: {
        id: index + 1,
        name: `Product ${product.name}`,
        description: `Product ${product.name} description`,
        price: (index + 1) * 100,
        stock: (index + 1) * 10,
        status: product.disabled ? false : true,
        categoryId: product.category,
      },
    });
  }

  console.log('seeding customers...');
  const dummyCustomersNames = ['1', '2'];
  for (const [index, name] of dummyCustomersNames.entries()) {
    await prisma.customer.create({
      data: {
        id: index + 1,
        name: `Customer ${name}`,
      },
    });
  }

  console.log('seeding orders...');
  const dummyOrders = [
    {
      customer: 1,
      products: [
        {
          productId: 1,
          quantity: 1,
          price: 150,
        },
        {
          productId: 2,
          quantity: 2,
          price: 250,
        },
      ],
    },
    {
      customer: 2,
      products: [
        {
          productId: 3,
          quantity: 3,
          price: 350,
        },
        {
          productId: 1,
          quantity: 4,
          price: 450,
        },
      ],
    },
  ];
  for (const order of dummyOrders) {
    await prisma.order.create({
      data: {
        customerId: order.customer,
        status: 'pending',
        OrderItem: {
          create: order.products,
        },
      },
    });
  }

  console.log('Seeding finished');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing products
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: "Classic Diamond Ring",
        price: 45000,
        originalPrice: 55000,
        imageUrl: "/products/ring1.png",
        description: "An elegant classic diamond ring.",
        isNew: true
      },
      {
        name: "Gold Minimalist Necklace",
        price: 25000,
        originalPrice: 28000,
        imageUrl: "/products/necklace1.png",
        description: "A beautiful everyday gold necklace.",
        isNew: false
      },
      {
        name: "Pearl Drop Earrings",
        price: 15000,
        originalPrice: 18000,
        imageUrl: "/products/earrings1.png",
        description: "Sophisticated pearl drop earrings.",
        isNew: true
      },
      {
        name: "Diamond Tennis Bracelet",
        price: 85000,
        originalPrice: 95000,
        imageUrl: "/products/bracelet1.png",
        description: "Stunning diamond tennis bracelet.",
        isNew: false
      }
    ]
  });
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

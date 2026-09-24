import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = ["Electronics", "Office Supplies", "Packaging", "Maintenance"];
  const suppliers = [
    { name: "TechSource", contactPerson: "Ari Nugroho", email: "ari@techsource.id", phone: "+6281111111" },
    { name: "PaperLine", contactPerson: "Nina Sari", email: "nina@paperline.id", phone: "+6282222222" },
    { name: "CargoHub", contactPerson: "Budi Santoso", email: "budi@cargohub.id", phone: "+6283333333" },
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: {},
      create: supplier,
    });
  }

  const electronics = await prisma.category.findUnique({ where: { name: "Electronics" } });
  const supplies = await prisma.category.findUnique({ where: { name: "Office Supplies" } });
  const packaging = await prisma.category.findUnique({ where: { name: "Packaging" } });
  const maintenance = await prisma.category.findUnique({ where: { name: "Maintenance" } });
  const techSource = await prisma.supplier.findUnique({ where: { name: "TechSource" } });
  const paperLine = await prisma.supplier.findUnique({ where: { name: "PaperLine" } });
  const cargoHub = await prisma.supplier.findUnique({ where: { name: "CargoHub" } });

  const productData = [
    {
      name: "Laptop Pro 14",
      sku: "LP-14-001",
      description: "Business laptop with long battery life",
      stock: 18,
      minStock: 5,
      unitPrice: 1450,
      categoryId: electronics?.id,
      supplierId: techSource?.id,
    },
    {
      name: "Wireless Mouse",
      sku: "WM-001",
      description: "Ergonomic wireless mouse",
      stock: 42,
      minStock: 10,
      unitPrice: 26,
      categoryId: electronics?.id,
      supplierId: techSource?.id,
    },
    {
      name: "A4 Copy Paper",
      sku: "PAPER-A4-200",
      description: "High quality A4 copy paper",
      stock: 120,
      minStock: 30,
      unitPrice: 8.5,
      categoryId: supplies?.id,
      supplierId: paperLine?.id,
    },
    {
      name: "Bubble Wrap Roll",
      sku: "BW-ROLL-25",
      description: "Protective packaging material",
      stock: 75,
      minStock: 20,
      unitPrice: 15,
      categoryId: packaging?.id,
      supplierId: cargoHub?.id,
    },
    {
      name: "Safety Gloves",
      sku: "SG-SET-10",
      description: "Industrial safety gloves",
      stock: 9,
      minStock: 12,
      unitPrice: 13.75,
      categoryId: maintenance?.id,
      supplierId: cargoHub?.id,
    },
  ];

  for (const item of productData) {
    const product = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {},
      create: {
        name: item.name,
        sku: item.sku,
        description: item.description,
        stock: item.stock,
        minStock: item.minStock,
        unitPrice: item.unitPrice,
        categoryId: item.categoryId,
        supplierId: item.supplierId,
      },
    });

    await prisma.stockTransaction.createMany({
      data: [
        {
          productId: product.id,
          type: TransactionType.IN,
          quantity: product.stock,
          unitPrice: product.unitPrice,
          note: "Initial inventory stock",
        },
      ],
    });
  }
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

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalProducts, totalInventoryValue, lowStockProducts, totalTransactions] = await Promise.all([
    prisma.product.count(),
    prisma.product.aggregate({
      _sum: {
        stock: true,
        unitPrice: true,
      },
    }),
    prisma.product.count({
      where: {
        stock: { lte: prisma.product.fields.minStock ?? 0 },
      },
    }),
    prisma.stockTransaction.count(),
  ]);

  const totalValue = Number((totalInventoryValue._sum.unitPrice ?? 0) * (totalInventoryValue._sum.stock ?? 0));

  return {
    totalProducts,
    totalInventoryValue: totalValue,
    lowStockProducts,
    totalTransactions,
  };
}

export async function getRecentTransactions(limit = 5) {
  return prisma.stockTransaction.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });
}

export async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getSuppliers() {
  return prisma.supplier.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getTransactions() {
  return prisma.stockTransaction.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const supplierId = String(formData.get("supplierId") ?? "") || null;
  const stock = Number(formData.get("stock") ?? 0);
  const minStock = Number(formData.get("minStock") ?? 0);
  const unitPrice = Number(formData.get("unitPrice") ?? 0);

  if (!name || !sku) {
    throw new Error("Product name and SKU are required.");
  }

  const product = await prisma.product.create({
    data: {
      name,
      sku,
      description: description || null,
      categoryId,
      supplierId,
      stock,
      minStock,
      unitPrice,
    },
  });

  if (stock > 0) {
    await prisma.stockTransaction.create({
      data: {
        productId: product.id,
        type: "IN",
        quantity: stock,
        unitPrice,
        note: "Initial stock",
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/transactions");
  redirect("/products");
}

export async function addTransaction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const type = String(formData.get("type") ?? "IN");
  const quantity = Number(formData.get("quantity") ?? 0);
  const adjustment = Number(formData.get("adjustment") ?? 0);
  const note = String(formData.get("note") ?? "").trim();

  if (!productId) {
    throw new Error("Product is required.");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw new Error("Product not found.");
  }

  let delta = 0;
  if (type === "IN") delta = quantity;
  if (type === "OUT") delta = -quantity;
  if (type === "ADJUSTMENT") delta = adjustment;

  if (product.stock + delta < 0) {
    throw new Error("Stock cannot go below zero.");
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: product.stock + delta,
    },
  });

  await prisma.stockTransaction.create({
    data: {
      productId,
      type: type as "IN" | "OUT" | "ADJUSTMENT",
      quantity: Math.abs(type === "ADJUSTMENT" ? adjustment : quantity),
      unitPrice: product.unitPrice,
      note: note || "Inventory adjustment",
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/transactions");
  redirect("/transactions");
}


import { prisma } from "@/lib/prisma";
import { createProduct } from "@/lib/inventory-actions";

export default async function NewProductPage() {
  const [categories, suppliers] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.supplier.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Products</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Create Product</h1>
      </div>

      <form action={createProduct} className="card space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">
              Product Name
            </label>
            <input id="name" name="name" className="input" placeholder="Laptop Pro 14" required />
          </div>

          <div>
            <label className="label" htmlFor="sku">
              SKU
            </label>
            <input id="sku" name="sku" className="input" placeholder="LP-14-001" required />
          </div>

          <div>
            <label className="label" htmlFor="categoryId">
              Category
            </label>
            <select id="categoryId" name="categoryId" className="input">
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="supplierId">
              Supplier
            </label>
            <select id="supplierId" name="supplierId" className="input">
              <option value="">Select supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="stock">
              Initial Stock
            </label>
            <input id="stock" name="stock" type="number" min={0} defaultValue={0} className="input" />
          </div>

          <div>
            <label className="label" htmlFor="minStock">
              Minimum Stock
            </label>
            <input id="minStock" name="minStock" type="number" min={0} defaultValue={0} className="input" />
          </div>

          <div className="md:col-span-2">
            <label className="label" htmlFor="unitPrice">
              Unit Price
            </label>
            <input id="unitPrice" name="unitPrice" type="number" min={0} step="0.01" defaultValue={0} className="input" />
          </div>

          <div className="md:col-span-2">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea id="description" name="description" rows={4} className="input" placeholder="Item details" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <a href="/products" className="button-secondary">
            Cancel
          </a>
          <button type="submit" className="button-primary">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

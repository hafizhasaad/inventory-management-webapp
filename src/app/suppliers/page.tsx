import { getCategories } from "@/lib/inventory-data";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Catalog</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Categories</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{category.name}</h2>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                {category._count.products} products
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

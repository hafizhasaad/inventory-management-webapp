import { getSuppliers } from "@/lib/inventory-data";

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Partners</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Suppliers</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{supplier.name}</h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {supplier._count.products} items
              </span>
            </div>
            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <p>{supplier.contactPerson ?? "No contact person"}</p>
              <p>{supplier.email ?? "No email"}</p>
              <p>{supplier.phone ?? "No phone"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

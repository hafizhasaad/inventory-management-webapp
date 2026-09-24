import Link from "next/link";
import { getDashboardStats, getRecentTransactions } from "@/lib/inventory-data";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export default async function HomePage() {
  const stats = await getDashboardStats();
  const transactions = await getRecentTransactions();

  const cards = [
    { label: "Total Products", value: stats.totalProducts, accent: "bg-brand-50 text-brand-700" },
    { label: "Inventory Value", value: formatCurrency(stats.totalInventoryValue), accent: "bg-emerald-50 text-emerald-700" },
    { label: "Low Stock", value: stats.lowStockProducts, accent: "bg-amber-50 text-amber-700" },
    { label: "Transactions", value: stats.totalTransactions, accent: "bg-sky-50 text-sky-700" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Inventory Dashboard</h1>
        </div>
        <Link href="/products/new" className="button-primary">
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card">
            <div className={`inline-flex rounded-xl p-3 ${card.accent}`}>
              <span className="text-lg font-semibold">{card.value}</span>
            </div>
            <p className="mt-4 text-sm text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="card">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Stock Activity</h2>
            <Link href="/transactions" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-medium text-slate-800">{transaction.product.name}</p>
                  <p className="text-sm text-slate-500">
                    {transaction.type} • {new Date(transaction.createdAt).toLocaleDateString()} 
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    transaction.type === "IN"
                      ? "bg-emerald-100 text-emerald-700"
                      : transaction.type === "OUT"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-5 space-y-3">
            <Link href="/products" className="button-secondary w-full">
              Manage Products
            </Link>
            <Link href="/suppliers" className="button-secondary w-full">
              Suppliers
            </Link>
            <Link href="/categories" className="button-secondary w-full">
              Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

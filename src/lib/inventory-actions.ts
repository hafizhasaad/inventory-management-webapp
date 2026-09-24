import { prisma } from "@/lib/prisma";
import { addTransaction } from "@/lib/inventory-actions";
import { getTransactions } from "@/lib/inventory-data";

export default async function TransactionsPage() {
  const [products, transactions] = await Promise.all([prisma.product.findMany({ orderBy: { name: "asc" } }), getTransactions()]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Operations</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Stock Transactions</h1>
      </div>

      <form action={addTransaction} className="card space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="productId">
              Product
            </label>
            <select id="productId" name="productId" className="input" required>
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="type">
              Transaction Type
            </label>
            <select id="type" name="type" className="input" defaultValue="IN">
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} className="input" />
          </div>

          <div>
            <label className="label" htmlFor="adjustment">
              Adjustment Value
            </label>
            <input id="adjustment" name="adjustment" type="number" step="1" defaultValue={0} className="input" />
          </div>

          <div className="md:col-span-2">
            <label className="label" htmlFor="note">
              Note
            </label>
            <textarea id="note" name="note" rows={3} className="input" placeholder="Reason for adjustment" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="button-primary">
            Save Transaction
          </button>
        </div>
      </form>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{transaction.product.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        transaction.type === "IN"
                          ? "bg-emerald-100 text-emerald-700"
                          : transaction.type === "OUT"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{transaction.quantity}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-slate-600">{transaction.note ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

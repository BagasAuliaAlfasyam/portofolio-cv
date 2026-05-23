import Link from "next/link";

const inventory = [
  ["Kopi Susu Gula Aren", "142", "Ready"],
  ["Nasi Goreng Special", "58", "Ready"],
  ["Jus Alpukat", "12", "Low Stock"],
  ["Cup 16oz", "480", "Ready"],
];

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-emerald-400" href="/">
        Back to dashboard
      </Link>
      <section className="glass mt-8 overflow-hidden rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white">Inventory</h1>
        <p className="mt-1 text-sm text-slate-500">
          Product stock monitoring and reorder status.
        </p>
        <table className="mt-6 w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Product", "Stock", "Status"].map((heading) => (
                <th
                  className="px-3 py-3 text-left text-[11px] uppercase tracking-wider text-slate-500"
                  key={heading}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map(([product, stock, status]) => (
              <tr className="border-b border-white/[0.03]" key={product}>
                <td className="px-3 py-4 text-sm font-semibold text-white">
                  {product}
                </td>
                <td className="px-3 py-4 text-sm text-slate-400">{stock}</td>
                <td className="px-3 py-4 text-sm text-slate-400">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

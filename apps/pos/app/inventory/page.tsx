import { AlertTriangle, Package, Plus, Search, Truck } from "lucide-react";
import { PosActionButton } from "../../components/action-button";
import {
  PosMetric,
  PosPageShell,
  PosPanel,
} from "../../components/feature-component";

const inventory = [
  ["Kopi Susu Gula Aren", "Drink", "142", "Ready", "40"],
  ["Nasi Goreng Special", "Food", "58", "Ready", "25"],
  ["Jus Alpukat", "Drink", "12", "Low Stock", "20"],
  ["Cup 16oz", "Packaging", "480", "Ready", "150"],
  ["Chicken Rice Bowl", "Food", "18", "Reorder", "24"],
];

export default function InventoryPage() {
  return (
    <PosPageShell
      actions={
        <PosActionButton featureName="Tambah produk dan sinkronisasi stok">
          <Plus className="h-4 w-4" /> Add product
        </PosActionButton>
      }
      eyebrow="Inventory"
      title="Stock control and reorder planning"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <PosMetric
          icon={Package}
          label="Active SKUs"
          note="Across 8 categories"
          value="184"
        />
        <PosMetric
          icon={AlertTriangle}
          label="Low stock"
          note="Needs restock today"
          value="18"
        />
        <PosMetric
          icon={Truck}
          label="Incoming PO"
          note="Expected tomorrow"
          value="7"
        />
      </div>
      <PosPanel title="Inventory list">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-surface-50 pl-10 pr-4 text-sm text-slate-200 outline-none"
            placeholder="Search SKU..."
          />
        </div>
        <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              <tr>
                {[
                  "Product",
                  "Category",
                  "Stock",
                  "Reorder point",
                  "Status",
                ].map((h) => (
                  <th className="px-4 py-3" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {inventory.map(([product, category, stock, status, reorder]) => (
                <tr key={product}>
                  <td className="px-4 py-4 font-black text-white">{product}</td>
                  <td className="px-4 py-4 font-semibold text-slate-400">
                    {category}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-400">
                    {stock}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-400">
                    {reorder}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PosPanel>
    </PosPageShell>
  );
}

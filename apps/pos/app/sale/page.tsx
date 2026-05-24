"use client";

import { Minus, Plus, Receipt, Search, ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency, PosMetric, PosPageShell, PosPanel } from "../../components/feature-component";

const products = [
  ["Kopi Susu Gula Aren", 30000, "Drink"],
  ["Nasi Goreng Special", 38000, "Food"],
  ["Matcha Latte", 34000, "Drink"],
  ["French Fries", 25000, "Snack"],
  ["Chicken Rice Bowl", 42000, "Food"],
  ["Mineral Water", 8000, "Drink"],
];

export default function SalePage() {
  const cart = [
    ["Kopi Susu Gula Aren", 30000, 2],
    ["French Fries", 25000, 1],
  ] as const;
  const subtotal = cart.reduce((sum, [, price, qty]) => sum + price * qty, 0);
  const tax = Math.round(subtotal * 0.11);

  return (
    <PosPageShell
      actions={<button className="h-10 rounded-lg bg-emerald-500 px-4 text-sm font-black text-white">Hold transaction</button>}
      eyebrow="New sale"
      title="Cashier checkout workspace"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <PosMetric icon={ShoppingCart} label="Items in cart" note="Current transaction" value="3" />
        <PosMetric icon={Receipt} label="Subtotal" note="Before tax" value={formatCurrency(subtotal)} />
        <PosMetric icon={Plus} label="Service speed" note="Avg checkout time" value="1m 42s" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <PosPanel title="Product catalog">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input className="h-10 w-full rounded-lg border border-white/[0.08] bg-surface-50 pl-10 pr-4 text-sm text-slate-200 outline-none" placeholder="Search product or scan barcode..." />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {products.map(([name, price, category]) => (
              <button className="rounded-xl border border-white/[0.08] bg-surface-50 p-4 text-left hover:border-emerald-500/40" key={name as string}>
                <p className="min-h-10 font-black text-white">{name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{category}</p>
                <p className="mt-4 text-lg font-black text-emerald-300">{formatCurrency(price as number)}</p>
              </button>
            ))}
          </div>
        </PosPanel>
        <PosPanel title="Receipt summary">
          <div className="grid gap-3">
            {cart.map(([name, price, qty]) => (
              <div className="rounded-lg border border-white/[0.08] bg-surface-50 p-4" key={name}>
                <div className="flex items-start justify-between"><div><p className="font-black text-white">{name}</p><p className="text-sm font-semibold text-slate-500">{formatCurrency(price)} each</p></div><Trash2 className="h-4 w-4 text-slate-500" /></div>
                <div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-lg border border-white/[0.08]"><Minus className="m-2 h-4 w-4 text-slate-400" /><span className="min-w-10 text-center font-black text-white">{qty}</span><Plus className="m-2 h-4 w-4 text-slate-400" /></div><p className="font-black text-emerald-300">{formatCurrency(price * qty)}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-white/[0.08] pt-4 text-sm font-semibold text-slate-400">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="mt-2 flex justify-between"><span>Tax 11%</span><span>{formatCurrency(tax)}</span></div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-500/10 p-4"><span className="font-black text-emerald-300">Total</span><span className="text-xl font-black text-white">{formatCurrency(subtotal + tax)}</span></div>
          </div>
        </PosPanel>
      </div>
    </PosPageShell>
  );
}

import Link from "next/link";

const products = [
  ["Kopi Susu Gula Aren", "Rp 30K"],
  ["Nasi Goreng Special", "Rp 45K"],
  ["Es Teh Manis", "Rp 10K"],
  ["Mie Ayam Bakso", "Rp 30K"],
];

export default function SalePage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-emerald-400" href="/">
        Back to dashboard
      </Link>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass rounded-xl p-6">
          <h1 className="text-2xl font-bold text-white">New Sale</h1>
          <p className="mt-1 text-sm text-slate-500">
            Quick cashier screen for selecting products and preparing checkout.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {products.map(([name, price]) => (
              <button
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-left hover:border-emerald-500/40"
                key={name}
                type="button"
              >
                <span className="block text-sm font-bold text-white">
                  {name}
                </span>
                <span className="mt-2 block text-xs text-emerald-400">
                  {price}
                </span>
              </button>
            ))}
          </div>
        </section>
        <aside className="glass rounded-xl p-6">
          <h2 className="text-lg font-bold text-white">Cart</h2>
          <p className="mt-3 text-sm text-slate-500">
            Cart state will connect to the transaction API when checkout is
            integrated.
          </p>
          <button
            className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-white"
            type="button"
          >
            Hold Transaction
          </button>
        </aside>
      </div>
    </main>
  );
}

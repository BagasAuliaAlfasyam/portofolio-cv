import Link from "next/link";
import {
  BarChart3,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", icon: ShoppingCart, label: "Cashier" },
  { href: "/sale", icon: ShoppingCart, label: "New Sale" },
  { href: "/inventory", icon: Package, label: "Inventory" },
  { href: "/transactions", icon: Receipt, label: "Transactions" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function PosPageShell({
  actions,
  children,
  eyebrow,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-background text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/[0.08] bg-sidebar lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-white/[0.08] px-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Catalyst POS</p>
              <p className="text-xs font-semibold text-slate-500">Store operations</p>
            </div>
          </div>
          <nav className="grid gap-1 px-4 py-5">
            {navItems.map((item) => (
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-white/[0.04] hover:text-slate-200" href={item.href} key={item.label}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="w-full p-4 md:p-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{title}</h1>
            </div>
            {actions}
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}

export function PosMetric({ icon: Icon, label, note, value }: { icon: LucideIcon; label: string; note: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <Icon className="h-5 w-5 text-emerald-300" />
      <p className="mt-3 text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-xs font-semibold text-slate-500">{note}</p>
    </div>
  );
}

export function PosPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h2 className="mb-5 text-lg font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value).replace("IDR", "Rp");
}

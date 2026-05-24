"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BadgePercent,
  Banknote,
  BarChart3,
  Bell,
  ChevronRight,
  CreditCard,
  Menu,
  Minus,
  Package,
  Plus,
  Receipt,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Trash2,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { PosActionButton } from "../components/action-button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Product = {
  category: "Food" | "Drink" | "Snack";
  id: string;
  name: string;
  price: number;
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    category: "Drink",
    id: "P-001",
    name: "Kopi Susu Gula Aren",
    price: 30000,
    stock: 42,
  },
  {
    category: "Food",
    id: "P-002",
    name: "Nasi Goreng Special",
    price: 38000,
    stock: 26,
  },
  {
    category: "Snack",
    id: "P-003",
    name: "Croissant Butter",
    price: 22000,
    stock: 18,
  },
  {
    category: "Drink",
    id: "P-004",
    name: "Matcha Latte",
    price: 34000,
    stock: 31,
  },
  {
    category: "Food",
    id: "P-005",
    name: "Chicken Rice Bowl",
    price: 42000,
    stock: 20,
  },
  {
    category: "Drink",
    id: "P-006",
    name: "Mineral Water",
    price: 8000,
    stock: 84,
  },
  {
    category: "Snack",
    id: "P-007",
    name: "French Fries",
    price: 25000,
    stock: 33,
  },
  {
    category: "Food",
    id: "P-008",
    name: "Mie Ayam Bakso",
    price: 36000,
    stock: 22,
  },
];

const salesByHour = [
  { hour: "09", sales: 920 },
  { hour: "10", sales: 1410 },
  { hour: "11", sales: 1860 },
  { hour: "12", sales: 2740 },
  { hour: "13", sales: 2210 },
  { hour: "14", sales: 1990 },
  { hour: "15", sales: 2330 },
  { hour: "16", sales: 3190 },
];

const transactions = [
  { id: "TX-1842", items: 4, method: "QRIS", time: "16:48", total: 142000 },
  { id: "TX-1841", items: 2, method: "Cash", time: "16:39", total: 68000 },
  { id: "TX-1840", items: 5, method: "Card", time: "16:22", total: 211000 },
];

const initialCart: CartItem[] = [
  {
    category: "Drink",
    id: "P-001",
    name: "Kopi Susu Gula Aren",
    price: 30000,
    quantity: 1,
    stock: 42,
  },
  {
    category: "Snack",
    id: "P-003",
    name: "Croissant Butter",
    price: 22000,
    quantity: 2,
    stock: 18,
  },
];

const navItems = [
  { href: "/", icon: ShoppingCart, label: "Cashier" },
  { href: "/sale", icon: ShoppingCart, label: "New Sale" },
  { href: "/inventory", icon: Package, label: "Inventory" },
  { href: "/transactions", icon: Receipt, label: "Transactions" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function POSDashboard() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [category, setCategory] = useState<Product["category"] | "All">("All");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [payment, setPayment] = useState("QRIS");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal >= 150000 ? 12000 : 0;
  const tax = Math.round((subtotal - discount) * 0.11);
  const total = subtotal - discount + tax;

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id: string, direction: "decrease" | "increase") {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  direction === "increase"
                    ? Math.min(item.quantity + 1, item.stock)
                    : item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/[0.08] bg-sidebar lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-white/[0.08] px-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Catalyst POS</p>
              <p className="text-xs font-semibold text-slate-500">
                Cashier workspace
              </p>
            </div>
          </div>
          <nav className="grid gap-1 px-4 py-5">
            {navItems.map((item) => (
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${item.href === "/" ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"}`}
                href={item.href}
                key={item.label}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <DemoPill />
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-300">
                Shift status
              </p>
              <p className="mt-2 text-sm font-bold text-white">
                Open cashier: Counter 02
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Cash drawer balanced at Rp 2.400.000
              </p>
            </div>
          </div>
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileNavOpen(false)}
            />
            <aside className="relative flex h-full w-[min(19rem,86vw)] flex-col border-r border-white/[0.08] bg-sidebar shadow-2xl app-slide-up">
              <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">
                      Catalyst POS
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      Cashier workspace
                    </p>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="grid gap-1 px-4 py-5">
                {navItems.map((item) => (
                  <Link
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${item.href === "/" ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"}`}
                    href={item.href}
                    key={item.label}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <DemoPill />
              </div>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 xl:overflow-hidden">
          <header className="flex h-16 items-center justify-between gap-3 border-b border-white/[0.08] bg-background/80 px-4 backdrop-blur md:px-6">
            <button
              aria-label="Open menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-surface-50 text-slate-300 lg:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-10 w-full rounded-lg border border-white/[0.08] bg-surface-50 pl-10 pr-4 text-sm font-semibold text-slate-200 outline-none focus:border-emerald-500/60"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search product by name or scan barcode..."
                value={query}
              />
            </div>
            <div className="hidden md:block">
              <DemoPill />
            </div>
            <PosActionButton
              className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400"
              featureName="Notifikasi cashier dan low stock"
            >
              <Bell className="h-4 w-4" />
            </PosActionButton>
          </header>

          <div className="grid grid-cols-1 xl:h-[calc(100vh-4rem)] xl:grid-cols-[minmax(0,1fr)_420px] xl:overflow-hidden">
            <section className="p-4 app-fade-in md:p-6 xl:overflow-y-auto">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                    New sale
                  </p>
                  <h1 className="mt-2 text-3xl font-black text-white">
                    Fast checkout with live catalog
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm font-medium text-slate-400">
                    Browse products, add items quickly, choose payment method,
                    and print a clean receipt summary.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["All", "Food", "Drink", "Snack"] as const).map((item) => (
                    <button
                      className={`rounded-lg border px-3 py-2 text-sm font-bold transition active:scale-[0.98] ${category === item ? "border-emerald-500 bg-emerald-500 text-white" : "border-white/[0.08] bg-surface-50 text-slate-400 hover:border-emerald-500/40 hover:text-slate-200"}`}
                      key={item}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 grid gap-4 app-slide-up sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  icon={Banknote}
                  label="Today sales"
                  value="Rp 18.5M"
                  detail="+22% vs yesterday"
                />
                <MetricCard
                  icon={Receipt}
                  label="Transactions"
                  value="127"
                  detail="Avg basket Rp 145K"
                />
                <MetricCard
                  icon={Package}
                  label="Products sold"
                  value="384"
                  detail="18 low stock items"
                />
                <MetricCard
                  icon={BadgePercent}
                  label="Discount used"
                  value="Rp 420K"
                  detail="Campaign active"
                />
              </div>

              <div className="grid gap-3 app-slide-up sm:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <button
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-left app-card-hover hover:border-emerald-500/40 hover:bg-emerald-500/10 active:scale-[0.99]"
                    key={product.id}
                    onClick={() => addToCart(product)}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="mt-4 min-h-10 text-base font-black text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      {product.category}
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <span className="text-lg font-black text-emerald-300">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="rounded-full bg-surface-50 px-2 py-1 text-xs font-bold text-slate-400">
                        Stock {product.stock}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-6 app-slide-up xl:grid-cols-[1fr_0.9fr]">
                <Panel title="Daily sales report" action="Hourly">
                  <ResponsiveContainer height={260} width="100%">
                    <BarChart data={salesByHour}>
                      <CartesianGrid
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="hour"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "#181825",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 8,
                        }}
                        formatter={(value) => `Rp ${value}K`}
                      />
                      <Bar
                        dataKey="sales"
                        fill="#10b981"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Panel>
                <Panel title="Recent transactions" action="Live">
                  <div className="grid gap-3">
                    {transactions.map((transaction) => (
                      <div
                        className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-surface-50 p-3"
                        key={transaction.id}
                      >
                        <div>
                          <p className="font-black text-white">
                            {transaction.id}
                          </p>
                          <p className="text-xs font-semibold text-slate-500">
                            {transaction.time} - {transaction.items} items -{" "}
                            {transaction.method}
                          </p>
                        </div>
                        <p className="font-black text-emerald-300">
                          {formatCurrency(transaction.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </section>

            <aside className="flex min-h-[640px] flex-col border-t border-white/[0.08] bg-surface p-4 md:p-6 xl:min-h-0 xl:border-l xl:border-t-0">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">
                    Receipt
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-white">
                    Current order
                  </h2>
                </div>
                <button
                  className="rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-bold text-slate-400"
                  onClick={() => setCart([])}
                >
                  Clear
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3">
                  {cart.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/[0.12] p-8 text-center">
                      <ShoppingCart className="mx-auto h-8 w-8 text-slate-600" />
                      <p className="mt-3 text-sm font-bold text-slate-400">
                        Cart is empty
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 app-card-hover"
                        key={item.id}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-black text-white">{item.name}</p>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              {formatCurrency(item.price)} each
                            </p>
                          </div>
                          <button
                            className="text-slate-500 hover:text-red-300"
                            onClick={() =>
                              setCart((current) =>
                                current.filter(
                                  (cartItem) => cartItem.id !== item.id,
                                ),
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-white/[0.08]">
                            <button
                              className="p-2 text-slate-400"
                              onClick={() =>
                                updateQuantity(item.id, "decrease")
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-10 text-center text-sm font-black text-white">
                              {item.quantity}
                            </span>
                            <button
                              className="p-2 text-slate-400"
                              onClick={() =>
                                updateQuantity(item.id, "increase")
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-black text-emerald-300">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-4 border-t border-white/[0.08] pt-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: WalletCards, label: "QRIS" },
                    { icon: Banknote, label: "Cash" },
                    { icon: CreditCard, label: "Card" },
                  ].map((method) => (
                    <button
                      className={`rounded-lg border px-3 py-3 text-sm font-bold ${payment === method.label ? "border-emerald-500 bg-emerald-500 text-white" : "border-white/[0.08] bg-white/[0.03] text-slate-400"}`}
                      key={method.label}
                      onClick={() => setPayment(method.label)}
                    >
                      <method.icon className="mx-auto mb-1 h-4 w-4" />
                      {method.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-2 text-sm font-semibold">
                  <SummaryLine
                    label="Subtotal"
                    value={formatCurrency(subtotal)}
                  />
                  <SummaryLine
                    label="Discount"
                    value={`-${formatCurrency(discount)}`}
                  />
                  <SummaryLine label="Tax 11%" value={formatCurrency(tax)} />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 p-4">
                  <span className="text-sm font-black uppercase tracking-[0.12em] text-emerald-300">
                    Total
                  </span>
                  <span className="text-2xl font-black text-white">
                    {formatCurrency(total)}
                  </span>
                </div>
                <PosActionButton
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-base font-black text-white shadow-lg shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={cart.length === 0}
                  featureName="Checkout dan payment posting"
                >
                  Charge {formatCurrency(total)}
                  <ChevronRight className="h-5 w-5" />
                </PosActionButton>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  detail,
  icon: Icon,
  label,
  value,
}: {
  detail: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 app-card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-xl font-black text-white">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">{detail}</p>
    </div>
  );
}

function Panel({
  action,
  children,
  title,
}: {
  action: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black text-white">{title}</h2>
        <span className="rounded-full bg-surface-50 px-3 py-1 text-xs font-bold text-slate-500">
          {action}
        </span>
      </div>
      {children}
    </section>
  );
}

function DemoPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-300">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      Demo mode
    </span>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-slate-400">
      <span>{label}</span>
      <span className="text-slate-200">{value}</span>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  })
    .format(value)
    .replace("IDR", "Rp");
}

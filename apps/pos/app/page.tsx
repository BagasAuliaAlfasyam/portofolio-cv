"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingCart, Package, Receipt, BarChart3,
  Settings, Bell, Search, Menu, Zap, Plus,
  TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingBag,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: ShoppingCart, label: "New Sale", href: "/sale" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Receipt, label: "Transactions", href: "/transactions" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const statsCards = [
  { title: "Today's Sales", value: "Rp 18.5M", change: "+22%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
  { title: "Transactions", value: "127", change: "+15", trend: "up", icon: Receipt, color: "from-blue-500 to-cyan-500" },
  { title: "Products Sold", value: "384", change: "+48", trend: "up", icon: ShoppingBag, color: "from-amber-500 to-orange-500" },
  { title: "Customers", value: "89", change: "-3", trend: "down", icon: Users, color: "from-violet-500 to-purple-500" },
];

const salesData = [
  { hour: "08:00", sales: 1200 }, { hour: "09:00", sales: 2400 }, { hour: "10:00", sales: 3100 },
  { hour: "11:00", sales: 4200 }, { hour: "12:00", sales: 5800 }, { hour: "13:00", sales: 6200 },
  { hour: "14:00", sales: 5400 }, { hour: "15:00", sales: 4800 }, { hour: "16:00", sales: 5100 },
  { hour: "17:00", sales: 6500 }, { hour: "18:00", sales: 7200 }, { hour: "19:00", sales: 4100 },
];

const topProducts = [
  { name: "Kopi Susu Gula Aren", qty: 48, revenue: "Rp 1.44M", trend: "+12%" },
  { name: "Nasi Goreng Special", qty: 35, revenue: "Rp 1.05M", trend: "+8%" },
  { name: "Es Teh Manis", qty: 62, revenue: "Rp 620K", trend: "+18%" },
  { name: "Mie Ayam Bakso", qty: 28, revenue: "Rp 840K", trend: "+5%" },
  { name: "Jus Alpukat", qty: 22, revenue: "Rp 550K", trend: "-3%" },
];

const recentTransactions = [
  { id: "TXN-001", time: "18:45", items: 3, total: "Rp 125K", payment: "Cash", status: "completed" },
  { id: "TXN-002", time: "18:32", items: 5, total: "Rp 287K", payment: "QRIS", status: "completed" },
  { id: "TXN-003", time: "18:20", items: 2, total: "Rp 78K", payment: "Cash", status: "completed" },
  { id: "TXN-004", time: "18:05", items: 4, total: "Rp 196K", payment: "Card", status: "completed" },
  { id: "TXN-005", time: "17:50", items: 1, total: "Rp 45K", payment: "QRIS", status: "refunded" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-surface-100 border border-white/[0.08] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-white mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="text-[11px] text-slate-400"><span style={{ color: e.color }}>●</span> {e.name}: Rp {e.value}K</p>
      ))}
    </div>
  );
}

export default function POSDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`${sidebarOpen ? "w-64" : "w-[70px]"} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && <div className="flex flex-col"><span className="text-sm font-bold text-white">POS</span><span className="text-[9px] text-slate-500 tracking-wider">CATALYST FORGE</span></div>}
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link key={link.label} href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${link.active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"}`}>
              <link.icon className="w-[18px] h-[18px] shrink-0" />{sidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]">
            <Menu className="w-4 h-4" />{sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search products, transactions..." className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/40" />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-surface-50 border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white"><Bell className="w-4 h-4" /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">CS</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div><h1 className="text-2xl font-bold text-white">POS Dashboard</h1><p className="text-sm text-slate-500 mt-1">Today&apos;s sales overview</p></div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"><Plus className="w-4 h-4" />New Sale</button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((s) => (
              <div key={s.title} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}><s.icon className="w-5 h-5 text-white" /></div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${s.trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                    {s.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{s.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.title}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-1">Hourly Sales</h3>
              <p className="text-xs text-slate-500 mb-4">Today&apos;s revenue by hour</p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={salesData}>
                  <defs><linearGradient id="posSales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="sales" name="Sales" stroke="#10b981" fill="url(#posSales)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-1">Top Products</h3>
              <p className="text-xs text-slate-500 mb-4">Best sellers today</p>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center justify-center">#{i + 1}</span>
                      <div><div className="text-xs font-medium text-white">{p.name}</div><div className="text-[10px] text-slate-500">{p.qty} sold · {p.revenue}</div></div>
                    </div>
                    <span className={`text-[10px] font-medium ${p.trend.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>{p.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-white/[0.06]">
                  {["ID", "Time", "Items", "Total", "Payment", "Status"].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="py-3 px-3 text-sm font-mono text-brand-400">{t.id}</td>
                      <td className="py-3 px-3 text-sm text-slate-400">{t.time}</td>
                      <td className="py-3 px-3 text-sm text-slate-400">{t.items}</td>
                      <td className="py-3 px-3 text-sm text-white font-medium">{t.total}</td>
                      <td className="py-3 px-3"><span className="px-2 py-0.5 text-[10px] rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">{t.payment}</span></td>
                      <td className="py-3 px-3"><span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${t.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

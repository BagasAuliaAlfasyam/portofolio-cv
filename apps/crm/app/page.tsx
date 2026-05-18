"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, Target, DollarSign, BarChart3, Mail,
  Settings, Bell, Search, Menu, Zap, ChevronDown, LogOut, User,
  TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

// ─── Sidebar ─────────────────────────────────────────────────────
const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: Users, label: "Contacts", href: "/contacts" },
  { icon: Target, label: "Deals", href: "/deals" },
  { icon: DollarSign, label: "Revenue", href: "/revenue" },
  { icon: Mail, label: "Campaigns", href: "/campaigns" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

// ─── Data ────────────────────────────────────────────────────────
const statsCards = [
  { title: "Total Contacts", value: "3,847", change: "+124", trend: "up", icon: Users, color: "from-blue-500 to-cyan-500" },
  { title: "Active Deals", value: "184", change: "+18", trend: "up", icon: Target, color: "from-violet-500 to-purple-500" },
  { title: "Revenue (MTD)", value: "Rp 2.4B", change: "+12.5%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
  { title: "Conversion Rate", value: "24.8%", change: "-2.1%", trend: "down", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
];

const revenueData = [
  { month: "Jan", revenue: 1800, deals: 28 }, { month: "Feb", revenue: 2100, deals: 32 },
  { month: "Mar", revenue: 1900, deals: 27 }, { month: "Apr", revenue: 2400, deals: 38 },
  { month: "May", revenue: 2200, deals: 35 }, { month: "Jun", revenue: 2600, deals: 42 },
  { month: "Jul", revenue: 2800, deals: 45 }, { month: "Aug", revenue: 3100, deals: 48 },
  { month: "Sep", revenue: 2900, deals: 44 }, { month: "Oct", revenue: 3200, deals: 52 },
  { month: "Nov", revenue: 2400, deals: 40 }, { month: "Dec", revenue: 3500, deals: 55 },
];

const pipeline = [
  { stage: "Lead", count: 82, value: "Rp 1.2B", color: "#818cf8" },
  { stage: "Qualified", count: 45, value: "Rp 890M", color: "#06b6d4" },
  { stage: "Proposal", count: 28, value: "Rp 620M", color: "#f59e0b" },
  { stage: "Negotiation", count: 18, value: "Rp 450M", color: "#10b981" },
  { stage: "Closed Won", count: 11, value: "Rp 280M", color: "#22c55e" },
];

const recentDeals = [
  { company: "PT Maju Bersama", contact: "Rudi Hartono", value: "Rp 180M", stage: "Proposal", probability: "65%" },
  { company: "CV Digital Nusantara", contact: "Sari Dewi", value: "Rp 95M", stage: "Negotiation", probability: "80%" },
  { company: "PT Karya Utama", contact: "Budi Prakoso", value: "Rp 250M", stage: "Qualified", probability: "40%" },
  { company: "PT Global Tech", contact: "Ayu Lestari", value: "Rp 120M", stage: "Closed Won", probability: "100%" },
  { company: "CV Sukses Mandiri", contact: "Dian Permata", value: "Rp 75M", stage: "Lead", probability: "20%" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-surface-100 border border-white/[0.08] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-white mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-[11px] text-slate-400">
          <span style={{ color: entry.color }}>●</span> {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

const stageColors: Record<string, string> = {
  Lead: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Qualified: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Proposal: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Negotiation: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Closed Won": "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function CRMDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-[70px]"} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">CRM</span>
                <span className="text-[9px] text-slate-500 tracking-wider">CATALYST FORGE</span>
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link key={link.label} href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                link.active ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
              }`}>
              <link.icon className="w-[18px] h-[18px] shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]">
            <Menu className="w-4 h-4" />{sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search contacts, deals..." className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/40" />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-surface-50 border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white transition-all">
              <Bell className="w-4 h-4" /><span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-500 text-[10px] text-white flex items-center justify-center">5</span>
            </button>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-surface-50 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">SM</div>
              <div className="hidden sm:block text-left"><div className="text-sm font-medium text-white">Sales Manager</div></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">CRM Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Sales pipeline and customer insights</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg shadow-lg shadow-violet-500/25 flex items-center gap-1.5">
              <Plus className="w-4 h-4" />New Deal
            </button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat) => (
              <div key={stat.title} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-1">Revenue & Deals</h3>
              <p className="text-xs text-slate-500 mb-4">Monthly performance</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="crmRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue (M)" stroke="#8b5cf6" fill="url(#crmRev)" strokeWidth={2} />
                  <Line type="monotone" dataKey="deals" name="Deals" stroke="#06b6d4" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pipeline */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-1">Sales Pipeline</h3>
              <p className="text-xs text-slate-500 mb-4">Current funnel</p>
              <div className="space-y-3">
                {pipeline.map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-400">{stage.stage}</span>
                      <span className="text-xs font-medium text-white">{stage.count} deals</span>
                    </div>
                    <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(stage.count / 82) * 100}%`, backgroundColor: stage.color }} />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{stage.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent deals */}
          <div className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Recent Deals</h3>
              <a href="#" className="text-xs text-violet-400">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Stage</th>
                    <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((deal, i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="py-3 px-3 text-sm font-medium text-white">{deal.company}</td>
                      <td className="py-3 px-3 text-sm text-slate-400">{deal.contact}</td>
                      <td className="py-3 px-3 text-sm text-slate-300 font-medium">{deal.value}</td>
                      <td className="py-3 px-3"><span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${stageColors[deal.stage]}`}>{deal.stage}</span></td>
                      <td className="py-3 px-3 text-sm text-slate-400">{deal.probability}</td>
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

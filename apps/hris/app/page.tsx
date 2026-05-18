"use client";

import { DashboardLayout } from "../components/dashboard-layout";
import {
  Users, DollarSign, CalendarCheck, TrendingUp, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, UserPlus, Clock, Award,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

// ─── Sample Data ─────────────────────────────────────────────────
const statsCards = [
  { title: "Total Employees", value: "247", change: "+12", trend: "up", icon: Users, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
  { title: "Monthly Payroll", value: "Rp 1.2B", change: "+5.2%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
  { title: "Attendance Rate", value: "94.8%", change: "-1.2%", trend: "down", icon: CalendarCheck, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
  { title: "Avg. Performance", value: "8.4/10", change: "+0.3", trend: "up", icon: TrendingUp, color: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/20" },
];

const revenueData = [
  { month: "Jan", employees: 210, payroll: 980 },
  { month: "Feb", employees: 215, payroll: 995 },
  { month: "Mar", employees: 220, payroll: 1020 },
  { month: "Apr", employees: 228, payroll: 1050 },
  { month: "May", employees: 235, payroll: 1100 },
  { month: "Jun", employees: 230, payroll: 1080 },
  { month: "Jul", employees: 238, payroll: 1120 },
  { month: "Aug", employees: 242, payroll: 1150 },
  { month: "Sep", employees: 240, payroll: 1140 },
  { month: "Oct", employees: 244, payroll: 1170 },
  { month: "Nov", employees: 245, payroll: 1180 },
  { month: "Dec", employees: 247, payroll: 1200 },
];

const departmentData = [
  { name: "Engineering", value: 68, color: "#6366f1" },
  { name: "Marketing", value: 35, color: "#06b6d4" },
  { name: "Sales", value: 42, color: "#10b981" },
  { name: "HR", value: 18, color: "#f59e0b" },
  { name: "Finance", value: 24, color: "#f43f5e" },
  { name: "Operations", value: 60, color: "#8b5cf6" },
];

const attendanceWeekly = [
  { day: "Mon", present: 235, absent: 12 },
  { day: "Tue", present: 240, absent: 7 },
  { day: "Wed", present: 238, absent: 9 },
  { day: "Thu", present: 232, absent: 15 },
  { day: "Fri", present: 228, absent: 19 },
];

const recentEmployees = [
  { name: "Andi Pratama", role: "Senior Engineer", department: "Engineering", date: "2 days ago", status: "active" },
  { name: "Siti Nurhaliza", role: "Marketing Lead", department: "Marketing", date: "5 days ago", status: "active" },
  { name: "Budi Santoso", role: "Sales Manager", department: "Sales", date: "1 week ago", status: "active" },
  { name: "Dewi Lestari", role: "HR Specialist", department: "HR", date: "2 weeks ago", status: "onboarding" },
  { name: "Rizky Hidayat", role: "DevOps Engineer", department: "Engineering", date: "2 weeks ago", status: "active" },
];

const leaveRequests = [
  { name: "Fajar Nugroho", type: "Annual Leave", from: "Nov 15", to: "Nov 18", status: "pending" },
  { name: "Maya Putri", type: "Sick Leave", from: "Nov 12", to: "Nov 13", status: "approved" },
  { name: "Ahmad Fauzi", type: "Personal", from: "Nov 20", to: "Nov 20", status: "pending" },
];

// ─── Custom Tooltip ──────────────────────────────────────────────
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

export default function HRISDashboard() {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Admin. Here&apos;s your HR overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm text-slate-400 border border-white/[0.08] rounded-lg hover:text-white hover:bg-white/[0.03] transition-all">
            <Clock className="w-4 h-4 inline mr-1.5" />
            Nov 2025
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-violet rounded-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center gap-1.5">
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat) => (
          <div
            key={stat.title}
            className="glass rounded-xl p-5 group hover:border-white/[0.1] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {/* Employee Growth Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Employee Growth & Payroll</h3>
              <p className="text-xs text-slate-500 mt-0.5">Monthly headcount and payroll trend</p>
            </div>
            <button className="p-1.5 rounded-md hover:bg-white/[0.04] text-slate-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="employees" name="Employees" stroke="#6366f1" fill="url(#colorEmp)" strokeWidth={2} />
              <Area type="monotone" dataKey="payroll" name="Payroll (M)" stroke="#06b6d4" fill="url(#colorPay)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">By Department</h3>
              <p className="text-xs text-slate-500 mt-0.5">Employee distribution</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {departmentData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-[11px] text-slate-500 truncate">{d.name}</span>
                <span className="text-[11px] text-slate-400 ml-auto font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance & Leave row */}
      <div className="grid lg:grid-cols-5 gap-4 mb-8">
        {/* Weekly attendance */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Weekly Attendance</h3>
          <p className="text-xs text-slate-500 mb-4">This week&apos;s overview</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceWeekly} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave requests */}
        <div className="lg:col-span-3 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Leave Requests</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pending approvals</p>
            </div>
            <a href="#" className="text-xs text-brand-400 hover:text-brand-300">View All</a>
          </div>
          <div className="space-y-3">
            {leaveRequests.map((req, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/30 to-accent-violet/30 flex items-center justify-center text-white text-xs font-bold">
                    {req.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{req.name}</div>
                    <div className="text-[11px] text-slate-500">{req.type} · {req.from} - {req.to}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                    req.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent employees table */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Employees</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest additions to the team</p>
          </div>
          <a href="/employees" className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="text-left py-3 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEmployees.map((emp, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-violet/20 flex items-center justify-center text-white text-xs font-bold border border-white/[0.06]">
                        {emp.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{emp.name}</div>
                        <div className="text-[11px] text-slate-500">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm text-slate-400">{emp.department}</td>
                  <td className="py-3 px-3 text-sm text-slate-500">{emp.date}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                      emp.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

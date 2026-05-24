"use client";

import { useMemo, useState, type ReactNode } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import {
  BadgeCheck,
  Banknote,
  CalendarCheck2,
  ChevronRight,
  Download,
  FileCheck2,
  Filter,
  Layers3,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Employee = {
  department: string;
  employment: "Permanent" | "Contract" | "Probation";
  manager: string;
  name: string;
  role: string;
  status: "Active" | "On leave" | "Onboarding";
};

const employees: Employee[] = [
  {
    department: "Engineering",
    employment: "Permanent",
    manager: "Dimas Prakasa",
    name: "Andi Pratama",
    role: "Senior Full Stack Engineer",
    status: "Active",
  },
  {
    department: "Sales",
    employment: "Permanent",
    manager: "Nadia Putri",
    name: "Budi Santoso",
    role: "Enterprise Account Manager",
    status: "Active",
  },
  {
    department: "People Ops",
    employment: "Probation",
    manager: "Maya Rahman",
    name: "Dewi Lestari",
    role: "HR Generalist",
    status: "Onboarding",
  },
  {
    department: "Finance",
    employment: "Contract",
    manager: "Rizal Hidayat",
    name: "Fajar Nugroho",
    role: "Payroll Analyst",
    status: "On leave",
  },
];

const attendanceData = [
  { day: "Mon", late: 8, present: 226, remote: 13 },
  { day: "Tue", late: 5, present: 232, remote: 10 },
  { day: "Wed", late: 7, present: 229, remote: 11 },
  { day: "Thu", late: 9, present: 223, remote: 15 },
  { day: "Fri", late: 12, present: 218, remote: 17 },
];

const payrollTrend = [
  { month: "Jan", gross: 980, net: 822 },
  { month: "Feb", gross: 995, net: 839 },
  { month: "Mar", gross: 1020, net: 861 },
  { month: "Apr", gross: 1050, net: 889 },
  { month: "May", gross: 1100, net: 931 },
  { month: "Jun", gross: 1080, net: 914 },
];

const leaveRequests = [
  { days: "3 days", name: "Fajar Nugroho", period: "May 27-29", type: "Annual leave" },
  { days: "1 day", name: "Maya Putri", period: "May 30", type: "Sick leave" },
  { days: "2 days", name: "Ahmad Fauzi", period: "Jun 3-4", type: "Personal leave" },
];

const orgUnits = [
  { count: 68, leader: "Dimas Prakasa", name: "Engineering" },
  { count: 42, leader: "Nadia Putri", name: "Sales" },
  { count: 60, leader: "Raka Wibowo", name: "Operations" },
  { count: 24, leader: "Rizal Hidayat", name: "Finance" },
];

export default function HRISDashboard() {
  const [query, setQuery] = useState("");
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      [employee.name, employee.role, employee.department]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">HRIS Command Center</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">People operations, attendance, payroll, and structure</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium text-slate-400">A professional HR workspace for employee lifecycle, leave approvals, workforce visibility, and payroll readiness.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.08] px-4 text-sm font-bold text-slate-300 hover:bg-white/[0.04]">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white shadow-lg shadow-brand-500/20">
              <UserPlus className="h-4 w-4" />
              Add employee
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Users} label="Total employees" value="247" detail="91% active headcount" />
          <MetricCard icon={CalendarCheck2} label="Attendance rate" value="94.8%" detail="12 late check-ins today" />
          <MetricCard icon={Banknote} label="Monthly payroll" value="Rp 1.2B" detail="Ready for approval" />
          <MetricCard icon={ShieldCheck} label="Compliance tasks" value="18" detail="5 contracts expiring" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel title="Employee management" action="Search and roster">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-surface-50 pl-10 pr-4 text-sm text-slate-200 outline-none focus:border-brand-500/60"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search employee, role, department..."
                  value={query}
                />
              </div>
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.08] px-4 text-sm font-bold text-slate-300">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/[0.08]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Manager</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredEmployees.map((employee) => (
                    <tr className="bg-surface/40" key={employee.name}>
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{employee.name}</div>
                        <div className="text-xs font-medium text-slate-500">{employee.role}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-300">{employee.department}</td>
                      <td className="px-4 py-3 font-semibold text-slate-400">{employee.manager}</td>
                      <td className="px-4 py-3">
                        <StatusPill value={employee.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Organizational structure" action="Departments">
            <div className="grid gap-3">
              {orgUnits.map((unit) => (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4" key={unit.name}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-white">{unit.name}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">Lead: {unit.leader}</p>
                    </div>
                    <div className="rounded-lg bg-brand-500/10 px-3 py-2 text-right">
                      <p className="text-lg font-black text-brand-400">{unit.count}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">People</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full bg-brand-500" style={{ width: `${Math.min(unit.count, 80)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Attendance and leave" action="This week">
            <ResponsiveContainer height={260} width="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#181825", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }} />
                <Bar dataKey="present" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="remote" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="late" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-3">
              {leaveRequests.map((request) => (
                <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] p-3" key={request.name}>
                  <div>
                    <p className="font-bold text-white">{request.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{request.type} - {request.period}</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">{request.days}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Payroll control" action="May payroll">
            <ResponsiveContainer height={260} width="100%">
              <LineChart data={payrollTrend}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#181825", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }} />
                <Line dataKey="gross" name="Gross payroll" stroke="#818cf8" strokeWidth={3} type="monotone" />
                <Line dataKey="net" name="Net payroll" stroke="#06b6d4" strokeWidth={3} type="monotone" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <PayrollStep icon={FileCheck2} label="Attendance locked" status="Done" />
              <PayrollStep icon={BadgeCheck} label="Deductions checked" status="Review" />
              <PayrollStep icon={Banknote} label="Bank file" status="Ready" />
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
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
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-xl shadow-black/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{detail}</p>
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
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-xl shadow-black/10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-white">{title}</h2>
        <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-bold text-slate-400">
          <Layers3 className="h-3.5 w-3.5" />
          {action}
        </span>
      </div>
      {children}
    </section>
  );
}

function PayrollStep({
  icon: Icon,
  label,
  status,
}: {
  icon: LucideIcon;
  label: string;
  status: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-surface-50 p-4">
      <Icon className="h-5 w-5 text-brand-400" />
      <p className="mt-3 text-sm font-bold text-white">{label}</p>
      <p className="mt-1 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-300">
        {status} <ChevronRight className="h-3 w-3" />
      </p>
    </div>
  );
}

function StatusPill({ value }: { value: Employee["status"] }) {
  const className =
    value === "Active"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
      : value === "Onboarding"
        ? "bg-brand-500/10 text-brand-300 border-brand-500/20"
        : "bg-amber-500/10 text-amber-300 border-amber-500/20";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${className}`}>
      {value}
    </span>
  );
}

"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Filter,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Stage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Won";
type Deal = {
  company: string;
  contact: string;
  due: string;
  owner: string;
  stage: Stage;
  value: number;
};
type Activity = {
  company: string;
  due: string;
  title: string;
  type: "Call" | "Email" | "Meeting";
};

const stages: Stage[] = ["Lead", "Qualified", "Proposal", "Negotiation", "Won"];

const deals: Deal[] = [
  {
    company: "PT Patra Drilling Contractor",
    contact: "Procurement Team",
    due: "Today, 15:00",
    owner: "Bagas",
    stage: "Negotiation",
    value: 420000000,
  },
  {
    company: "RS Prima Inti Medika",
    contact: "Silfa",
    due: "Tomorrow",
    owner: "Bagas",
    stage: "Proposal",
    value: 160000000,
  },
  {
    company: "PT Sinar Teknologi Nusantara",
    contact: "Ratna Wijaya",
    due: "May 26",
    owner: "Nadia",
    stage: "Qualified",
    value: 260000000,
  },
  {
    company: "CV Mandiri Retailindo",
    contact: "Hendra Gunawan",
    due: "May 28",
    owner: "Fikri",
    stage: "Lead",
    value: 95000000,
  },
  {
    company: "PT Artha Karya Sentosa",
    contact: "Budi Santoso",
    due: "Kickoff",
    owner: "Nadia",
    stage: "Won",
    value: 310000000,
  },
  {
    company: "Universitas Malikussaleh",
    contact: "Al Hilal Hamzi",
    due: "Overdue",
    owner: "Bagas",
    stage: "Proposal",
    value: 45000000,
  },
];

const activities: Activity[] = [
  {
    company: "PT Patra Drilling Contractor",
    due: "Today 15:00",
    title: "Send revised commercial proposal",
    type: "Email",
  },
  {
    company: "RS Prima Inti Medika",
    due: "Tomorrow 10:30",
    title: "Confirm chatbot escalation flow",
    type: "Call",
  },
  {
    company: "PT Sinar Teknologi Nusantara",
    due: "May 26",
    title: "Discovery workshop with sales director",
    type: "Meeting",
  },
];

const pipelineTrend = [
  { month: "Jan", pipeline: 520, won: 180 },
  { month: "Feb", pipeline: 610, won: 240 },
  { month: "Mar", pipeline: 575, won: 210 },
  { month: "Apr", pipeline: 790, won: 340 },
  { month: "May", pipeline: 940, won: 310 },
  { month: "Jun", pipeline: 1120, won: 450 },
];

const sourceData = [
  { source: "Website", value: 34 },
  { source: "Referral", value: 28 },
  { source: "LinkedIn", value: 21 },
  { source: "Outbound", value: 17 },
];

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Pipeline", href: "/pipeline", icon: Target },
  { label: "Accounts", href: "/accounts", icon: Building2 },
  { label: "Tasks", href: "/tasks", icon: CheckCircle2 },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function CrmDashboard() {
  const [query, setQuery] = useState("");
  const [activeStage, setActiveStage] = useState<Stage | "All">("All");

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesStage = activeStage === "All" || deal.stage === activeStage;
      const matchesQuery = [deal.company, deal.contact, deal.owner]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesStage && matchesQuery;
    });
  }, [activeStage, query]);

  const pipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce((sum, deal) => {
    const probability = deal.stage === "Won" ? 1 : deal.stage === "Negotiation" ? 0.8 : deal.stage === "Proposal" ? 0.65 : deal.stage === "Qualified" ? 0.45 : 0.25;
    return sum + deal.value * probability;
  }, 0);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#172033]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B3A5C] text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black">Catalyst CRM</p>
              <p className="text-xs font-semibold text-slate-500">Sales operating system</p>
            </div>
          </div>
          <nav className="grid gap-1 px-4 py-5">
            {navItems.map((item) => (
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold ${item.href === "/" ? "bg-[#1B3A5C] text-white" : "text-slate-600 hover:bg-slate-100"}`}
                href={item.href}
                key={item.label}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-slate-200 p-4">
            <div className="rounded-lg bg-[#F7EDE8] p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#E8531A]">Next action</p>
              <p className="mt-2 text-sm font-bold text-[#172033]">3 follow-ups due before end of day.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden w-[360px] md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-[#E8531A] focus:bg-white"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search deals, contacts, owners..."
                  value={query}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600">
                <Bell className="h-4 w-4" />
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E8531A] px-4 text-sm font-bold text-white shadow-sm">
                <Plus className="h-4 w-4" />
                Add deal
              </button>
            </div>
          </header>

          <section className="space-y-6 p-4 md:p-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#E8531A]">CRM Dashboard</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1B3A5C] md:text-4xl">Pipeline, contacts, and sales follow-up in one view</h1>
                <p className="mt-2 max-w-3xl text-base font-medium text-slate-600">Monitor deal health, prioritize activities, and keep account owners aligned on the next revenue move.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", ...stages] as const).map((stage) => (
                  <button
                    className={`rounded-lg border px-3 py-2 text-sm font-bold ${activeStage === stage ? "border-[#1B3A5C] bg-[#1B3A5C] text-white" : "border-slate-200 bg-white text-slate-600"}`}
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard icon={CircleDollarSign} label="Pipeline value" value={formatMoney(pipelineValue)} helper="+18% from last month" />
              <MetricCard icon={Target} label="Weighted forecast" value={formatMoney(weightedValue)} helper="Expected close value" />
              <MetricCard icon={UserRound} label="Active accounts" value="42" helper="12 enterprise accounts" />
              <MetricCard icon={CalendarClock} label="Follow-ups due" value="9" helper="3 high priority today" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
              <Panel title="Deal pipeline" action="Kanban by stage">
                <div className="grid gap-3 lg:grid-cols-5">
                  {stages.map((stage) => {
                    const stageDeals = filteredDeals.filter((deal) => deal.stage === stage);
                    return (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3" key={stage}>
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-black text-[#1B3A5C]">{stage}</p>
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-500">{stageDeals.length}</span>
                        </div>
                        <div className="grid gap-3">
                          {stageDeals.map((deal) => (
                            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm" key={deal.company}>
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-black text-slate-900">{deal.company}</p>
                                <MoreHorizontal className="h-4 w-4 text-slate-400" />
                              </div>
                              <p className="mt-1 text-xs font-semibold text-slate-500">{deal.contact}</p>
                              <div className="mt-3 flex items-center justify-between text-xs font-bold">
                                <span className="text-[#E8531A]">{formatMoney(deal.value)}</span>
                                <span className="text-slate-500">{deal.due}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel title="Sales metrics" action="Last 6 months">
                <ResponsiveContainer height={250} width="100%">
                  <AreaChart data={pipelineTrend}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip />
                    <Area dataKey="pipeline" fill="#1B3A5C22" name="Pipeline" stroke="#1B3A5C" strokeWidth={2} type="monotone" />
                    <Area dataKey="won" fill="#E8531A22" name="Won" stroke="#E8531A" strokeWidth={2} type="monotone" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 h-36">
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={sourceData}>
                      <XAxis dataKey="source" tick={{ fill: "#64748b", fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#E8531A" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <Panel title="Contact management" action="Account health">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Owner</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredDeals.slice(0, 5).map((deal) => (
                        <tr key={deal.company}>
                          <td className="px-4 py-3 font-bold text-slate-900">{deal.company}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-slate-700">{deal.contact}</div>
                            <div className="mt-1 flex gap-2 text-slate-400">
                              <Mail className="h-3.5 w-3.5" />
                              <Phone className="h-3.5 w-3.5" />
                            </div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-600">{deal.owner}</td>
                          <td className="px-4 py-3">
                            <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#1B3A5C]">
                              Open <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Panel>

              <Panel title="Follow-up activities" action="Priority queue">
                <div className="grid gap-3">
                  {activities.map((activity) => (
                    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4" key={activity.title}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7EDE8] text-[#E8531A]">
                        <CalendarClock className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-black text-slate-900">{activity.title}</p>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{activity.type}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{activity.company}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#E8531A]">{activity.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  helper,
  icon: Icon,
  label,
  value,
}: {
  helper: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-[#1B3A5C]">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F7EDE8] text-[#E8531A]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{helper}</p>
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
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-[#1B3A5C]">{title}</h2>
        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          {action}
        </span>
      </div>
      {children}
    </section>
  );
}

function formatMoney(value: number) {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}B`;
  }

  return `Rp ${Math.round(value / 1000000)}M`;
}

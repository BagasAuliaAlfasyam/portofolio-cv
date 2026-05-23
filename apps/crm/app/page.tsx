"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownUp,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
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
  X,
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

type Stage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won";
type Priority = "High" | "Medium" | "Low";
type SortKey = "company" | "value" | "stage" | "owner" | "nextFollowUp";

type Deal = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  owner: string;
  stage: Stage;
  value: number;
  probability: number;
  nextFollowUp: string;
  lastActivity: string;
  source: string;
  notes: string;
};

type Task = {
  id: string;
  title: string;
  company: string;
  due: string;
  priority: Priority;
  type: "Call" | "Email" | "Meeting" | "Proposal";
  completed: boolean;
};

type DealFormState = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  owner: string;
  stage: Stage;
  value: string;
  probability: string;
  nextFollowUp: string;
  source: string;
  notes: string;
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Pipeline", icon: Target, href: "/pipeline" },
  { label: "Accounts", icon: Building2, href: "/accounts" },
  { label: "Tasks", icon: CheckCircle2, href: "/tasks" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const stages: Stage[] = [
  "Lead",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
];

const stageProbability: Record<Stage, number> = {
  Lead: 25,
  Qualified: 45,
  Proposal: 65,
  Negotiation: 80,
  "Closed Won": 100,
};

const initialDeals: Deal[] = [
  {
    id: "D-1024",
    company: "PT Patra Drilling Contractor",
    contact: "Procurement Team",
    email: "procurement@patradrilling.com",
    phone: "+62 21 0000 1201",
    industry: "Energy",
    owner: "Bagas",
    stage: "Negotiation",
    value: 420000000,
    probability: 78,
    nextFollowUp: "2026-05-24",
    lastActivity: "Proposal revision sent",
    source: "Referral",
    notes:
      "Focus on procurement document generation, approval tracking, and executive reporting.",
  },
  {
    id: "D-1025",
    company: "RS Prima Inti Medika",
    contact: "Silfa",
    email: "silfa@primamedika.example",
    phone: "+62 812 2390 2281",
    industry: "Healthcare",
    owner: "Bagas",
    stage: "Proposal",
    value: 160000000,
    probability: 62,
    nextFollowUp: "2026-05-25",
    lastActivity: "Demo chatbot flow completed",
    source: "Inbound",
    notes:
      "Pomeng chatbot scope includes service guide, FAQ, and escalation to admin.",
  },
  {
    id: "D-1026",
    company: "PT Sinar Teknologi Nusantara",
    contact: "Ratna Wijaya",
    email: "ratna@sinartech.example",
    phone: "+62 811 7730 8890",
    industry: "Distribution",
    owner: "Nadia",
    stage: "Qualified",
    value: 260000000,
    probability: 45,
    nextFollowUp: "2026-05-26",
    lastActivity: "Discovery meeting booked",
    source: "LinkedIn",
    notes:
      "Needs CRM, sales pipeline, and branch performance dashboard for directors.",
  },
  {
    id: "D-1027",
    company: "CV Mandiri Retailindo",
    contact: "Hendra Gunawan",
    email: "hendra@mandiriretail.example",
    phone: "+62 857 2198 4401",
    industry: "Retail",
    owner: "Fikri",
    stage: "Lead",
    value: 95000000,
    probability: 25,
    nextFollowUp: "2026-05-28",
    lastActivity: "New inquiry from website",
    source: "Website",
    notes:
      "Interested in POS, inventory sync, and cashier reporting for three stores.",
  },
  {
    id: "D-1028",
    company: "PT Artha Karya Sentosa",
    contact: "Budi Santoso",
    email: "budi@arthakarya.example",
    phone: "+62 818 9930 1102",
    industry: "Manufacturing",
    owner: "Nadia",
    stage: "Closed Won",
    value: 310000000,
    probability: 100,
    nextFollowUp: "2026-06-01",
    lastActivity: "Kickoff scheduled",
    source: "Referral",
    notes:
      "Won project for customer portal, internal dashboard, and maintenance package.",
  },
  {
    id: "D-1029",
    company: "Universitas Malikussaleh",
    contact: "Al Hilal Hamzi",
    email: "alhilal@student.example",
    phone: "+62 853 2017 3301",
    industry: "Education",
    owner: "Bagas",
    stage: "Proposal",
    value: 45000000,
    probability: 70,
    nextFollowUp: "2026-05-23",
    lastActivity: "Research model requirements confirmed",
    source: "Personal Network",
    notes:
      "Expert system for vannamei shrimp disease diagnosis with Naive Bayes and Certainty Factor.",
  },
];

const initialTasks: Task[] = [
  {
    id: "T-01",
    title: "Send revised HTE procurement scope",
    company: "PT Patra Drilling Contractor",
    due: "Today 15:00",
    priority: "High",
    type: "Proposal",
    completed: false,
  },
  {
    id: "T-02",
    title: "Follow up chatbot flow approval",
    company: "RS Prima Inti Medika",
    due: "Tomorrow 10:30",
    priority: "Medium",
    type: "Call",
    completed: false,
  },
  {
    id: "T-03",
    title: "Prepare CRM discovery questions",
    company: "PT Sinar Teknologi Nusantara",
    due: "May 26",
    priority: "Medium",
    type: "Meeting",
    completed: false,
  },
  {
    id: "T-04",
    title: "Email POS demo access",
    company: "CV Mandiri Retailindo",
    due: "May 28",
    priority: "Low",
    type: "Email",
    completed: false,
  },
];

const revenueData = [
  { month: "Jan", revenue: 180, deals: 8 },
  { month: "Feb", revenue: 240, deals: 12 },
  { month: "Mar", revenue: 210, deals: 9 },
  { month: "Apr", revenue: 360, deals: 15 },
  { month: "May", revenue: 420, deals: 18 },
  { month: "Jun", revenue: 520, deals: 22 },
];

const sourceData = [
  { source: "Referral", count: 18 },
  { source: "Website", count: 14 },
  { source: "LinkedIn", count: 11 },
  { source: "Inbound", count: 9 },
  { source: "Network", count: 7 },
];

const crmSettings = [
  {
    title: "Pipeline Stages",
    description: "Lead, Qualified, Proposal, Negotiation, Closed Won",
    status: "Configured",
  },
  {
    title: "Lead Assignment",
    description: "Round-robin owner assignment for new inbound leads",
    status: "Active",
  },
  {
    title: "Follow-up Reminder",
    description: "Notify sales owner before scheduled next follow-up",
    status: "Active",
  },
  {
    title: "Export Template",
    description: "Monthly executive report for pipeline and activities",
    status: "Draft",
  },
];

const stageStyles: Record<Stage, string> = {
  Lead: "border-slate-300 bg-slate-50 text-slate-700",
  Qualified: "border-blue-200 bg-blue-50 text-blue-700",
  Proposal: "border-amber-200 bg-amber-50 text-amber-700",
  Negotiation: "border-violet-200 bg-violet-50 text-violet-700",
  "Closed Won": "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const priorityStyles: Record<Priority, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-slate-50 text-slate-700 border-slate-200",
};

function formatCurrency(value: number) {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}B`;
  }

  return `Rp ${Math.round(value / 1000000)}M`;
}

function sortDeals(items: Deal[], sortKey: SortKey) {
  return [...items].sort((first, second) => {
    if (sortKey === "value") {
      return second.value - first.value;
    }

    return String(first[sortKey]).localeCompare(String(second[sortKey]));
  });
}

export default function CRMWorkspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [dealRecords, setDealRecords] = useState<Deal[]>(initialDeals);
  const [taskRecords, setTaskRecords] = useState<Task[]>(initialTasks);
  const [selectedDealId, setSelectedDealId] = useState(
    initialDeals[0]?.id ?? "",
  );
  const [isDealFormOpen, setIsDealFormOpen] = useState(false);
  const [defaultStage, setDefaultStage] = useState<Stage>("Lead");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [enabledSettings, setEnabledSettings] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      crmSettings.map((setting) => [setting.title, setting.status !== "Draft"]),
    ),
  );

  const selectedDeal =
    dealRecords.find((deal) => deal.id === selectedDealId) ?? dealRecords[0];

  const filteredDeals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = dealRecords.filter((deal) => {
      const matchesQuery = [
        deal.company,
        deal.contact,
        deal.industry,
        deal.owner,
        deal.stage,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

      const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
      return matchesQuery && matchesStage;
    });

    return sortDeals(filtered, sortKey);
  }, [dealRecords, query, sortKey, stageFilter]);

  const totalPipeline = dealRecords.reduce((sum, deal) => sum + deal.value, 0);
  const weightedPipeline = dealRecords.reduce(
    (sum, deal) => sum + (deal.value * deal.probability) / 100,
    0,
  );
  const wonDeals = dealRecords.filter(
    (deal) => deal.stage === "Closed Won",
  ).length;
  const openTasks = taskRecords.filter((task) => !task.completed);
  const followUpsDue = openTasks.filter(
    (task) => task.priority !== "Low",
  ).length;
  const completedTasks = taskRecords.filter((task) => task.completed).length;

  const reportMetrics = [
    {
      label: "Average Deal Size",
      value: formatCurrency(
        Math.round(totalPipeline / Math.max(dealRecords.length, 1)),
      ),
      note: "Across all visible opportunities",
    },
    {
      label: "Sales Cycle",
      value: "21 days",
      note: "Lead to proposal average",
    },
    {
      label: "Win Rate",
      value: `${Math.round((wonDeals / Math.max(dealRecords.length, 1)) * 100)}%`,
      note: "Closed won from active deals",
    },
    {
      label: "Task Completion",
      value: `${completedTasks}/${taskRecords.length}`,
      note: "Completed follow-up actions",
    },
  ];

  const notify = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2600);
  };

  const scrollToSection = (target: string) => {
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openDealForm = (stage: Stage = "Lead") => {
    setDefaultStage(stage);
    setIsDealFormOpen(true);
  };

  const createDeal = (deal: Deal) => {
    setDealRecords((currentDeals) => [deal, ...currentDeals]);
    setSelectedDealId(deal.id);
    setIsDealFormOpen(false);
    notify(`${deal.company} added to ${deal.stage}.`);
  };

  const updateDealStage = (dealId: string, stage: Stage) => {
    setDealRecords((currentDeals) =>
      currentDeals.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              stage,
              probability: stageProbability[stage],
              lastActivity: `Moved to ${stage}`,
            }
          : deal,
      ),
    );
    notify(`Deal moved to ${stage}.`);
  };

  const createFollowUp = (deal: Deal) => {
    const task: Task = {
      id: `T-${Date.now().toString().slice(-5)}`,
      title: `Follow up with ${deal.contact}`,
      company: deal.company,
      due: deal.nextFollowUp,
      priority: deal.probability >= 70 ? "High" : "Medium",
      type: "Call",
      completed: false,
    };

    setTaskRecords((currentTasks) => [task, ...currentTasks]);
    notify(`Follow-up created for ${deal.company}.`);
    scrollToSection("tasks");
  };

  const completeTask = (taskId: string) => {
    setTaskRecords((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
    notify("Task status updated.");
  };

  const toggleSetting = (title: string) => {
    setEnabledSettings((currentSettings) => ({
      ...currentSettings,
      [title]: !currentSettings[title],
    }));
    notify(`${title} setting updated.`);
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#172033]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-white transition-all duration-300 lg:flex lg:flex-col ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B3A5C] text-white">
            <BriefcaseBusiness className="h-6 w-6" />
          </div>
          {isSidebarOpen ? (
            <div>
              <p className="text-lg font-bold tracking-tight">Catalyst CRM</p>
              <p className="text-sm text-slate-500">Sales workspace</p>
            </div>
          ) : null}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((item) => (
            <Link
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-semibold transition ${
                item.label === "Dashboard"
                  ? "bg-[#1B3A5C] text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#1B3A5C]"
              }`}
              href={item.href}
              key={item.label}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen ? <span>{item.label}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 border-t border-slate-200 p-3">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8531A] px-4 py-3 text-base font-bold text-white hover:bg-[#F4784A]"
            onClick={() => openDealForm()}
            type="button"
          >
            <Plus className="h-5 w-5" />
            {isSidebarOpen ? <span>New Deal</span> : null}
          </button>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-100"
            onClick={() => setIsSidebarOpen((value) => !value)}
            type="button"
          >
            <Menu className="h-5 w-5" />
            {isSidebarOpen ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>

      <div className={isSidebarOpen ? "lg:pl-72" : "lg:pl-20"}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 lg:px-8">
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8531A]">
                CRM
              </p>
              <h1 className="truncate text-2xl font-bold tracking-tight text-[#1B3A5C]">
                Sales Pipeline Command Center
              </h1>
            </div>

            <div className="hidden min-w-[320px] max-w-lg flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 md:flex">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                className="h-11 w-full bg-transparent px-3 text-base outline-none placeholder:text-slate-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search company, contact, owner..."
                value={query}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm"
                onClick={() =>
                  notify(`${followUpsDue} priority follow-ups need attention.`)
                }
                type="button"
              >
                <Bell className="h-5 w-5" />
                {followUpsDue > 0 ? (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#E8531A]" />
                ) : null}
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-[#E8531A] px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-[#F4784A]"
                onClick={() => openDealForm()}
                type="button"
              >
                <Plus className="h-5 w-5" />
                New Deal
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-8 p-5 lg:p-8">
          <section
            className="grid scroll-mt-24 gap-4 md:grid-cols-2 xl:grid-cols-4"
            id="dashboard"
          >
            <MetricCard
              icon={<CircleDollarSign className="h-6 w-6" />}
              label="Total Pipeline"
              value={formatCurrency(totalPipeline)}
              note="+18% from last month"
            />
            <MetricCard
              icon={<Target className="h-6 w-6" />}
              label="Weighted Forecast"
              value={formatCurrency(weightedPipeline)}
              note="Probability adjusted"
            />
            <MetricCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              label="Won Deals"
              value={`${wonDeals}`}
              note="Ready for onboarding"
            />
            <MetricCard
              icon={<CalendarClock className="h-6 w-6" />}
              label="Priority Follow-ups"
              value={`${followUpsDue}`}
              note="Due this week"
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Panel
              title="Revenue Forecast"
              description="Pipeline value and deal volume"
            >
              <div className="h-72">
                <ResponsiveContainer height="100%" width="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="crmRevenue"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#1B3A5C"
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1B3A5C"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#64748B", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                    <Tooltip />
                    <Area
                      dataKey="revenue"
                      fill="url(#crmRevenue)"
                      name="Revenue (M)"
                      stroke="#1B3A5C"
                      strokeWidth={3}
                      type="monotone"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel
              title="Lead Sources"
              description="Where opportunities come from"
            >
              <div className="h-72">
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart data={sourceData}>
                    <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="source"
                      tick={{ fill: "#64748B", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#E8531A" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </section>

          <Panel
            title="Pipeline Board"
            description="Kanban view by sales stage"
            action={<MoreHorizontal className="h-5 w-5 text-slate-400" />}
            id="pipeline"
          >
            <div className="grid gap-4 xl:grid-cols-5">
              {stages.map((stage) => {
                const stageDeals = dealRecords.filter(
                  (deal) => deal.stage === stage,
                );
                const stageValue = stageDeals.reduce(
                  (sum, deal) => sum + deal.value,
                  0,
                );

                return (
                  <div className="rounded-lg bg-slate-50 p-4" key={stage}>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-[#1B3A5C]">
                          {stage}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {stageDeals.length} deals -{" "}
                          {formatCurrency(stageValue)}
                        </p>
                      </div>
                      <button
                        className="rounded-full bg-white p-2 text-slate-500 shadow-sm"
                        onClick={() => openDealForm(stage)}
                        type="button"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {stageDeals.length > 0 ? (
                        stageDeals.map((deal) => (
                          <DealCard
                            deal={deal}
                            key={deal.id}
                            onSelect={setSelectedDealId}
                            onStageChange={updateDealStage}
                          />
                        ))
                      ) : (
                        <button
                          className="w-full rounded-lg border border-dashed border-slate-300 bg-white p-4 text-left text-sm font-semibold text-slate-500 hover:border-[#E8531A] hover:text-[#E8531A]"
                          onClick={() => openDealForm(stage)}
                          type="button"
                        >
                          Add first {stage.toLowerCase()} deal
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <section
            className="grid scroll-mt-24 gap-6 xl:grid-cols-[1.4fr_0.6fr]"
            id="accounts"
          >
            <Panel
              title="Lead & Deal Table"
              description="Manual table with search, stage filter, and sorting"
              action={
                <div className="flex flex-wrap items-center gap-2">
                  <FilterSelect
                    label="Stage"
                    onChange={setStageFilter}
                    options={["All", ...stages]}
                    value={stageFilter}
                  />
                  <SortSelect onChange={setSortKey} value={sortKey} />
                </div>
              }
            >
              <div className="mb-4 flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 md:hidden">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  className="h-11 w-full bg-transparent px-3 text-base outline-none placeholder:text-slate-400"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search deals..."
                  value={query}
                />
              </div>

              <DealTable
                deals={filteredDeals}
                onSelect={setSelectedDealId}
                onStageChange={updateDealStage}
              />
            </Panel>

            <div className="space-y-6">
              {selectedDeal ? (
                <DealProfile
                  deal={selectedDeal}
                  onCall={(deal) => {
                    window.location.href = `tel:${deal.phone}`;
                  }}
                  onCreateFollowUp={createFollowUp}
                  onEmail={(deal) => {
                    window.location.href = `mailto:${deal.email}`;
                  }}
                  onStageChange={updateDealStage}
                />
              ) : null}
            </div>
          </section>

          <Panel
            title="Task Management"
            description="Follow-up queue with due dates, priority, and activity type"
            id="tasks"
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {taskRecords.map((task) => (
                <TaskCard key={task.id} onComplete={completeTask} task={task} />
              ))}
            </div>
          </Panel>

          <section
            className="grid scroll-mt-24 gap-6 xl:grid-cols-[0.8fr_1.2fr]"
            id="reports"
          >
            <Panel
              title="Sales Reports"
              description="Management-level CRM metrics"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {reportMetrics.map((metric) => (
                  <div
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                    key={metric.label}
                  >
                    <p className="text-base font-semibold text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-[#1B3A5C]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-slate-500">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="Activity Report"
              description="Tasks by priority and ownership"
            >
              <TaskReport tasks={taskRecords} />
            </Panel>
          </section>

          <Panel
            title="CRM Settings"
            description="Operational configuration preview for the CRM workspace"
            id="settings"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {crmSettings.map((setting) => (
                <SettingCard
                  enabled={enabledSettings[setting.title] ?? false}
                  key={setting.title}
                  onToggle={() => toggleSetting(setting.title)}
                  setting={setting}
                />
              ))}
            </div>
          </Panel>
        </main>
      </div>

      {isDealFormOpen ? (
        <DealFormModal
          defaultStage={defaultStage}
          onClose={() => setIsDealFormOpen(false)}
          onCreate={createDeal}
        />
      ) : null}

      {toastMessage ? <Toast message={toastMessage} /> : null}
    </div>
  );
}

function MetricCard({
  icon,
  label,
  note,
  value,
}: {
  icon: ReactNode;
  label: string;
  note: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#1B3A5C]">
            {value}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#E8531A]">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-base leading-relaxed text-slate-500">{note}</p>
    </article>
  );
}

function Panel({
  action,
  children,
  description,
  id,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  description?: string;
  id?: string;
  title: string;
}) {
  return (
    <section
      className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      id={id}
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1B3A5C]">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-base leading-relaxed text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function DealCard({
  deal,
  onSelect,
  onStageChange,
}: {
  deal: Deal;
  onSelect: (dealId: string) => void;
  onStageChange: (dealId: string, stage: Stage) => void;
}) {
  return (
    <article
      className={`rounded-lg border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${stageStyles[deal.stage]}`}
    >
      <button
        className="w-full text-left"
        onClick={() => onSelect(deal.id)}
        type="button"
      >
        <p className="text-base font-bold text-[#172033]">{deal.company}</p>
        <p className="mt-1 text-sm text-slate-500">{deal.contact}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-bold">{formatCurrency(deal.value)}</span>
          <span>{deal.probability}%</span>
        </div>
      </button>
      <select
        className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none"
        onChange={(event) =>
          onStageChange(deal.id, event.target.value as Stage)
        }
        value={deal.stage}
      >
        {stages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </article>
  );
}

function DealTable({
  deals,
  onSelect,
  onStageChange,
}: {
  deals: Deal[];
  onSelect: (dealId: string) => void;
  onStageChange: (dealId: string, stage: Stage) => void;
}) {
  if (deals.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-lg font-bold text-[#1B3A5C]">No deals found</p>
        <p className="mt-2 text-base text-slate-500">
          Adjust the search or stage filter to see more opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[880px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            {[
              "Company",
              "Contact",
              "Stage",
              "Value",
              "Owner",
              "Next Follow-up",
            ].map((heading) => (
              <th
                className="px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-slate-500"
                key={heading}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              className="cursor-pointer border-b border-slate-100 hover:bg-slate-50"
              key={deal.id}
              onClick={() => onSelect(deal.id)}
            >
              <td className="px-4 py-4">
                <p className="text-base font-bold text-[#1B3A5C]">
                  {deal.company}
                </p>
                <p className="text-sm text-slate-500">{deal.industry}</p>
              </td>
              <td className="px-4 py-4 text-base text-slate-700">
                {deal.contact}
              </td>
              <td className="px-4 py-4">
                <select
                  className={`rounded-full border px-3 py-1 text-sm font-bold outline-none ${stageStyles[deal.stage]}`}
                  onChange={(event) =>
                    onStageChange(deal.id, event.target.value as Stage)
                  }
                  onClick={(event) => event.stopPropagation()}
                  value={deal.stage}
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 text-base font-bold text-slate-800">
                {formatCurrency(deal.value)}
              </td>
              <td className="px-4 py-4 text-base text-slate-700">
                {deal.owner}
              </td>
              <td className="px-4 py-4 text-base text-slate-700">
                {deal.nextFollowUp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TaskCard({
  onComplete,
  task,
}: {
  onComplete: (taskId: string) => void;
  task: Task;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-base font-bold text-[#172033] ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{task.company}</p>
        </div>
        <span
          className={`rounded-full border px-2 py-1 text-xs font-bold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          {task.due}
        </span>
        <span>{task.type}</span>
      </div>
      <button
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#E8531A] hover:text-[#E8531A]"
        onClick={() => onComplete(task.id)}
        type="button"
      >
        <CheckCircle2 className="h-4 w-4" />
        {task.completed ? "Reopen Task" : "Mark Complete"}
      </button>
    </div>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: Stage | "All") => void;
  options: Array<Stage | "All">;
  value: Stage | "All";
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
      <Filter className="h-4 w-4" />
      {label}
      <select
        className="bg-transparent text-sm font-bold outline-none"
        onChange={(event) => onChange(event.target.value as Stage | "All")}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="h-4 w-4" />
    </label>
  );
}

function SortSelect({
  onChange,
  value,
}: {
  onChange: (value: SortKey) => void;
  value: SortKey;
}) {
  const options: Array<{ label: string; value: SortKey }> = [
    { label: "Value", value: "value" },
    { label: "Company", value: "company" },
    { label: "Stage", value: "stage" },
    { label: "Owner", value: "owner" },
    { label: "Follow-up", value: "nextFollowUp" },
  ];

  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
      <ArrowDownUp className="h-4 w-4" />
      Sort
      <select
        className="bg-transparent text-sm font-bold outline-none"
        onChange={(event) => onChange(event.target.value as SortKey)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DealProfile({
  deal,
  onCall,
  onCreateFollowUp,
  onEmail,
  onStageChange,
}: {
  deal: Deal;
  onCall: (deal: Deal) => void;
  onCreateFollowUp: (deal: Deal) => void;
  onEmail: (deal: Deal) => void;
  onStageChange: (dealId: string, stage: Stage) => void;
}) {
  const activities = [
    deal.lastActivity,
    `Next follow-up on ${deal.nextFollowUp}`,
    `Owner assigned to ${deal.owner}`,
  ];

  return (
    <Panel title="Account Profile" description="Selected customer context">
      <div className="rounded-lg bg-[#1B3A5C] p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#F4784A]">
              {deal.stage}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">
              {deal.company}
            </h3>
          </div>
          <select
            className="rounded-full border border-white/20 bg-white px-3 py-2 text-sm font-bold text-[#1B3A5C] outline-none"
            onChange={(event) =>
              onStageChange(deal.id, event.target.value as Stage)
            }
            value={deal.stage}
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-base leading-relaxed text-white/76">
          {deal.notes}
        </p>
      </div>

      <div className="mt-5 grid gap-3 text-base text-slate-700">
        <ProfileRow
          icon={<UserRound className="h-5 w-5" />}
          text={deal.contact}
        />
        <ProfileRow icon={<Mail className="h-5 w-5" />} text={deal.email} />
        <ProfileRow icon={<Phone className="h-5 w-5" />} text={deal.phone} />
        <ProfileRow
          icon={<Activity className="h-5 w-5" />}
          text={deal.source}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:border-[#E8531A] hover:text-[#E8531A]"
          onClick={() => onCall(deal)}
          type="button"
        >
          Call
        </button>
        <button
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:border-[#E8531A] hover:text-[#E8531A]"
          onClick={() => onEmail(deal)}
          type="button"
        >
          Email
        </button>
        <button
          className="rounded-lg bg-[#E8531A] px-3 py-2 text-sm font-bold text-white hover:bg-[#F4784A]"
          onClick={() => onCreateFollowUp(deal)}
          type="button"
        >
          Follow-up
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-600">
          <span>Probability</span>
          <span>{deal.probability}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#E8531A]"
            style={{ width: `${deal.probability}%` }}
          />
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <h4 className="text-base font-bold text-[#1B3A5C]">
          Activity Timeline
        </h4>
        <div className="mt-4 space-y-4">
          {activities.map((activity) => (
            <div className="flex gap-3" key={activity}>
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#E8531A]" />
              <p className="text-base leading-relaxed text-slate-600">
                {activity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function ProfileRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-[#E8531A]">{icon}</span>
      <span className="min-w-0 truncate">{text}</span>
    </div>
  );
}

function TaskReport({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-slate-200">
            {["Task", "Account", "Due", "Priority", "Type", "Status"].map(
              (heading) => (
                <th
                  className="px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-slate-500"
                  key={heading}
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr className="border-b border-slate-100" key={task.id}>
              <td className="px-4 py-4 text-base font-bold text-[#172033]">
                {task.title}
              </td>
              <td className="px-4 py-4 text-base text-slate-600">
                {task.company}
              </td>
              <td className="px-4 py-4 text-base text-slate-600">{task.due}</td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full border px-2 py-1 text-xs font-bold ${priorityStyles[task.priority]}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-4 text-base text-slate-600">
                {task.type}
              </td>
              <td className="px-4 py-4 text-base font-bold text-slate-600">
                {task.completed ? "Completed" : "Open"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingCard({
  enabled,
  onToggle,
  setting,
}: {
  enabled: boolean;
  onToggle: () => void;
  setting: (typeof crmSettings)[number];
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div>
        <p className="text-lg font-bold tracking-tight text-[#1B3A5C]">
          {setting.title}
        </p>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          {setting.description}
        </p>
        <p className="mt-3 text-sm font-bold text-slate-500">
          Current status: {enabled ? setting.status : "Paused"}
        </p>
      </div>
      <button
        aria-pressed={enabled}
        className={`relative h-8 w-14 rounded-full transition ${
          enabled ? "bg-[#E8531A]" : "bg-slate-300"
        }`}
        onClick={onToggle}
        type="button"
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
            enabled ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function DealFormModal({
  defaultStage,
  onClose,
  onCreate,
}: {
  defaultStage: Stage;
  onClose: () => void;
  onCreate: (deal: Deal) => void;
}) {
  const [form, setForm] = useState<DealFormState>({
    company: "",
    contact: "",
    email: "",
    phone: "",
    industry: "",
    owner: "Bagas",
    stage: defaultStage,
    value: "",
    probability: String(stageProbability[defaultStage]),
    nextFollowUp: "",
    source: "Website",
    notes: "",
  });

  const updateForm = (field: keyof DealFormState, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
      ...(field === "stage"
        ? { probability: String(stageProbability[value as Stage]) }
        : {}),
    }));
  };

  const submitDeal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const deal: Deal = {
      id: `D-${Date.now().toString().slice(-5)}`,
      company: form.company.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      industry: form.industry.trim(),
      owner: form.owner.trim(),
      stage: form.stage,
      value: Number(form.value),
      probability: Number(form.probability),
      nextFollowUp: form.nextFollowUp,
      lastActivity: "Created from CRM quick form",
      source: form.source.trim(),
      notes: form.notes.trim(),
    };

    onCreate(deal);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              New Opportunity
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1B3A5C]">
              Create Deal
            </h2>
          </div>
          <button
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-[#E8531A]"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="grid gap-4 p-6" onSubmit={submitDeal}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Company"
              onChange={(value) => updateForm("company", value)}
              required
              value={form.company}
            />
            <FormField
              label="Contact"
              onChange={(value) => updateForm("contact", value)}
              required
              value={form.contact}
            />
            <FormField
              label="Email"
              onChange={(value) => updateForm("email", value)}
              required
              type="email"
              value={form.email}
            />
            <FormField
              label="Phone"
              onChange={(value) => updateForm("phone", value)}
              required
              value={form.phone}
            />
            <FormField
              label="Industry"
              onChange={(value) => updateForm("industry", value)}
              required
              value={form.industry}
            />
            <FormField
              label="Owner"
              onChange={(value) => updateForm("owner", value)}
              required
              value={form.owner}
            />
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Stage
              <select
                className="h-11 rounded-lg border border-slate-200 px-3 text-base font-semibold outline-none focus:border-[#E8531A]"
                onChange={(event) =>
                  updateForm("stage", event.target.value as Stage)
                }
                value={form.stage}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </label>
            <FormField
              label="Deal Value"
              min="0"
              onChange={(value) => updateForm("value", value)}
              required
              type="number"
              value={form.value}
            />
            <FormField
              label="Probability"
              max="100"
              min="0"
              onChange={(value) => updateForm("probability", value)}
              required
              type="number"
              value={form.probability}
            />
            <FormField
              label="Next Follow-up"
              onChange={(value) => updateForm("nextFollowUp", value)}
              required
              type="date"
              value={form.nextFollowUp}
            />
            <FormField
              label="Source"
              onChange={(value) => updateForm("source", value)}
              required
              value={form.source}
            />
          </div>

          <label className="grid gap-2 text-sm font-bold text-slate-600">
            Notes
            <textarea
              className="min-h-28 rounded-lg border border-slate-200 px-3 py-3 text-base font-normal leading-relaxed outline-none focus:border-[#E8531A]"
              onChange={(event) => updateForm("notes", event.target.value)}
              required
              value={form.notes}
            />
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              className="rounded-lg border border-slate-200 px-5 py-3 text-base font-bold text-slate-600 hover:bg-slate-50"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-[#E8531A] px-5 py-3 text-base font-bold text-white hover:bg-[#F4784A]"
              type="submit"
            >
              Save Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  max,
  min,
  onChange,
  required,
  type = "text",
  value,
}: {
  label: string;
  max?: string;
  min?: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "date" | "email" | "number" | "text";
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-600">
      {label}
      <input
        className="h-11 rounded-lg border border-slate-200 px-3 text-base font-normal outline-none focus:border-[#E8531A]"
        max={max}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-lg border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-[#1B3A5C] shadow-xl">
      {message}
    </div>
  );
}

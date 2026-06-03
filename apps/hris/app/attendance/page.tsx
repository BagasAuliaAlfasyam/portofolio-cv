"use client";

import { DashboardLayout } from "../../components/dashboard-layout";
import {
  CalendarCheck2,
  Clock3,
  PlaneTakeoff,
  ShieldAlert,
} from "lucide-react";

const attendance = [
  ["Monday", "235", "13", "8", "95.1%"],
  ["Tuesday", "240", "10", "5", "97.2%"],
  ["Wednesday", "238", "11", "7", "96.4%"],
  ["Thursday", "232", "15", "9", "93.9%"],
  ["Friday", "228", "17", "12", "92.3%"],
];

const leave = [
  ["Fajar Nugroho", "Annual leave", "May 27-29", "Pending manager"],
  ["Maya Putri", "Sick leave", "May 30", "Approved"],
  ["Ahmad Fauzi", "Personal leave", "Jun 3-4", "Pending HR"],
];

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Header
          title="Attendance and leave control"
          subtitle="Monitor daily presence, remote work, late arrivals, and approval-ready leave requests."
        />
        <div className="grid gap-4 md:grid-cols-4">
          <Mini icon={CalendarCheck2} label="Present today" value="228" />
          <Mini icon={PlaneTakeoff} label="Remote" value="17" />
          <Mini icon={Clock3} label="Late" value="12" />
          <Mini icon={ShieldAlert} label="Exceptions" value="5" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
          <Panel title="Weekly attendance matrix">
            <div className="grid gap-3">
              {attendance.map(([day, present, remote, late, rate]) => (
                <div
                  className="rounded-lg border border-white/[0.08] bg-surface-50 p-4"
                  key={day}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-black text-white">{day}</p>
                    <p className="text-lg font-black text-emerald-300">
                      {rate}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {present} present - {remote} remote - {late} late
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: rate }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Leave approvals">
            <div className="grid gap-3">
              {leave.map(([name, type, period, status]) => (
                <div
                  className="rounded-lg border border-white/[0.08] bg-surface-50 p-4"
                  key={name}
                >
                  <p className="font-black text-white">{name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {type} - {period}
                  </p>
                  <p className="mt-3 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-300">
                    {status}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Header({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <div className="min-w-0">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">
        Attendance
      </p>
      <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm font-medium text-slate-500">{subtitle}</p>
    </div>
  );
}
function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarCheck2;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <Icon className="h-5 w-5 text-brand-400" />
      <p className="mt-3 text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}
function Panel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <h2 className="mb-5 text-lg font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

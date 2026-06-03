"use client";

import { DashboardLayout } from "../../components/dashboard-layout";
import { Award, Goal, TrendingUp } from "lucide-react";

const performance = [
  [
    "Engineering",
    "8.8",
    "Delivery velocity and release quality are strong.",
    "92% OKR",
  ],
  [
    "Sales",
    "8.2",
    "Pipeline hygiene improving with tighter follow-up SLA.",
    "84% OKR",
  ],
  [
    "Marketing",
    "8.5",
    "Campaign execution stable with improved attribution.",
    "87% OKR",
  ],
  ["Operations", "8.1", "SLA consistency under management review.", "79% OKR"],
];

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">
            Performance
          </p>
          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Department scorecards
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Track team outcomes, OKR progress, and management notes in one
            operating view.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Metric icon={Award} label="Avg score" value="8.4/10" />
          <Metric icon={Goal} label="OKR completion" value="86%" />
          <Metric icon={TrendingUp} label="Improvement plans" value="7" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {performance.map(([department, score, note, okr]) => (
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              key={department}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="min-w-0 text-lg font-black text-white">
                  {department}
                </h2>
                <span className="shrink-0 text-2xl font-black text-brand-400">
                  {score}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                {note}
              </p>
              <p className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                {okr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
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

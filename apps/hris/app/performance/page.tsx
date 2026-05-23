"use client";

import { DashboardLayout } from "../../components/dashboard-layout";

const performance = [
  ["Engineering", "8.8", "Strong delivery velocity"],
  ["Sales", "8.2", "Pipeline discipline improving"],
  ["Marketing", "8.5", "Campaign execution stable"],
  ["Operations", "8.1", "SLA consistency under review"],
];

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Performance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Department scorecards and management notes.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {performance.map(([department, score, note]) => (
          <div className="glass rounded-xl p-5" key={department}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{department}</h2>
              <span className="text-2xl font-bold text-brand-400">
                {score}/10
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">{note}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

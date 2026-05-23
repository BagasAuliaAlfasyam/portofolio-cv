"use client";

import { DashboardLayout } from "../../components/dashboard-layout";

const settings = [
  ["Employee Fields", "Configure required employee profile fields."],
  ["Attendance Policy", "Set working days, tolerance, and approval rules."],
  ["Payroll Components", "Maintain allowance, benefit, and deduction items."],
  ["Role Access", "Prepare HR, finance, manager, and employee permissions."],
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          HRIS configuration modules ready for backend integration.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {settings.map(([title, description]) => (
          <div className="glass rounded-xl p-5" key={title}>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

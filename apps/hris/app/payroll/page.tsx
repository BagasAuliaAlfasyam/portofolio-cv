"use client";

import { DashboardLayout } from "../../components/dashboard-layout";

const payrollItems = [
  ["Gross Payroll", "Rp 1.2B", "This month"],
  ["Allowances", "Rp 180M", "Transport, meals, position"],
  ["Deductions", "Rp 74M", "Tax and attendance"],
  ["Net Payroll", "Rp 1.05B", "Ready for approval"],
];

export default function PayrollPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Payroll</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monthly payroll summary and approval preparation.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {payrollItems.map(([label, value, note]) => (
          <div className="glass rounded-xl p-5" key={label}>
            <p className="text-sm font-semibold text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{note}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

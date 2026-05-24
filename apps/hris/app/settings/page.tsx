"use client";

import { DashboardLayout } from "../../components/dashboard-layout";
import { CalendarCog, LockKeyhole, SlidersHorizontal, WalletCards, type LucideIcon } from "lucide-react";

const settings: Array<{ description: string; icon: LucideIcon; title: string }> = [
  { description: "Configure mandatory identity, employment, and document fields.", icon: SlidersHorizontal, title: "Employee profile fields" },
  { description: "Set work schedules, late tolerance, overtime, and leave approval paths.", icon: CalendarCog, title: "Attendance policy" },
  { description: "Maintain allowance, benefit, deduction, and tax components.", icon: WalletCards, title: "Payroll components" },
  { description: "Control permissions for HR, finance, managers, and employees.", icon: LockKeyhole, title: "Role access" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div><p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">Settings</p><h1 className="mt-2 text-3xl font-black text-white">HRIS configuration</h1><p className="mt-2 text-sm font-medium text-slate-500">Policy and access controls that make the HR system operationally credible.</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(({ description, icon: Icon, title }) => (
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5" key={title}>
              <Icon className="h-5 w-5 text-brand-400" />
              <h2 className="mt-4 text-lg font-black text-white">{title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

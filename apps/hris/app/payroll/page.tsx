"use client";

import { DashboardLayout } from "../../components/dashboard-layout";
import { HrisActionButton } from "../../components/feature-component";
import { Banknote, CheckCircle2, FileText, WalletCards } from "lucide-react";

const payrollItems = [
  ["Gross payroll", "Rp 1.2B", "247 employees"],
  ["Allowances", "Rp 180M", "Transport, meals, position"],
  ["Deductions", "Rp 74M", "Tax, BPJS, attendance"],
  ["Net payroll", "Rp 1.05B", "Ready for approval"],
];

const approvals = [
  "Attendance locked",
  "Tax components reviewed",
  "Bank disbursement file ready",
  "Payslip draft generated",
];

export default function PayrollPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">
            Payroll
          </p>
          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Payroll processing workspace
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Review gross-to-net components, lock attendance, and prepare
            disbursement.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {payrollItems.map(([label, value, note]) => (
            <div
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              key={label}
            >
              <Banknote className="h-5 w-5 text-brand-400" />
              <p className="mt-3 text-sm font-bold text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-white">{value}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                {note}
              </p>
            </div>
          ))}
        </div>
        <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
          <h2 className="mb-5 text-lg font-black text-white">
            Approval checklist
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {approvals.map((item, index) => (
              <div
                className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-surface-50 p-4"
                key={item}
              >
                {index < 3 ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                ) : (
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                )}
                <span className="font-bold leading-6 text-slate-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <HrisActionButton
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-black text-white sm:w-auto"
            featureName="Approve payroll batch"
          >
            <WalletCards className="h-4 w-4" /> Approve payroll batch
          </HrisActionButton>
        </section>
      </div>
    </DashboardLayout>
  );
}

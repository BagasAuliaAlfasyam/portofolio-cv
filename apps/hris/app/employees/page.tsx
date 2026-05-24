"use client";

import { DashboardLayout } from "../../components/dashboard-layout";
import { HrisActionButton } from "../../components/feature-component";
import {
  BriefcaseBusiness,
  Download,
  Search,
  UserPlus,
  Users,
} from "lucide-react";

const employees = [
  [
    "Andi Pratama",
    "Senior Full Stack Engineer",
    "Engineering",
    "Dimas Prakasa",
    "Permanent",
    "Active",
  ],
  [
    "Siti Nurhaliza",
    "Marketing Lead",
    "Marketing",
    "Maya Rahman",
    "Permanent",
    "Active",
  ],
  [
    "Budi Santoso",
    "Sales Manager",
    "Sales",
    "Nadia Putri",
    "Permanent",
    "Active",
  ],
  [
    "Dewi Lestari",
    "HR Generalist",
    "People Ops",
    "Maya Rahman",
    "Probation",
    "Onboarding",
  ],
  [
    "Rizky Hidayat",
    "DevOps Engineer",
    "Engineering",
    "Dimas Prakasa",
    "Contract",
    "Active",
  ],
];

export default function EmployeesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 app-fade-in">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-400">
              Employees
            </p>
            <h1 className="mt-2 text-3xl font-black text-white">
              Employee master data
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Central directory for employment status, managers, departments,
              and lifecycle actions.
            </p>
          </div>
          <div className="flex gap-2">
            <HrisActionButton
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.08] px-4 text-sm font-bold text-slate-300"
              featureName="Export employee roster"
            >
              <Download className="h-4 w-4" /> Export
            </HrisActionButton>
            <HrisActionButton featureName="Tambah employee baru">
              <UserPlus className="h-4 w-4" /> Add employee
            </HrisActionButton>
          </div>
        </div>
        <div className="grid gap-4 app-slide-up md:grid-cols-3">
          <Card icon={Users} label="Headcount" value="247" />
          <Card icon={BriefcaseBusiness} label="Open roles" value="12" />
          <Card icon={UserPlus} label="Onboarding" value="8" />
        </div>
        <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 app-slide-up">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-black text-white">Employee roster</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-10 w-full rounded-lg border border-white/[0.08] bg-surface-50 pl-10 pr-4 text-sm text-slate-200 outline-none"
                placeholder="Search employees..."
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  {[
                    "Name",
                    "Role",
                    "Department",
                    "Manager",
                    "Employment",
                    "Status",
                  ].map((h) => (
                    <th className="px-4 py-3" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {employees.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td
                        className={`px-4 py-4 ${index === 0 ? "font-black text-white" : "font-semibold text-slate-400"}`}
                        key={cell}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Card({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 app-card-hover">
      <Icon className="h-5 w-5 text-brand-400" />
      <p className="mt-3 text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

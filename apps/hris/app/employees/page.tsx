"use client";

import { DashboardLayout } from "../../components/dashboard-layout";

const employees = [
  ["Andi Pratama", "Senior Engineer", "Engineering", "Active"],
  ["Siti Nurhaliza", "Marketing Lead", "Marketing", "Active"],
  ["Budi Santoso", "Sales Manager", "Sales", "Active"],
  ["Dewi Lestari", "HR Specialist", "HR", "Onboarding"],
  ["Rizky Hidayat", "DevOps Engineer", "Engineering", "Active"],
];

export default function EmployeesPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Employees</h1>
        <p className="mt-1 text-sm text-slate-500">
          Employee directory, roles, departments, and current status.
        </p>
      </div>
      <div className="glass overflow-hidden rounded-xl">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Name", "Role", "Department", "Status"].map((heading) => (
                <th
                  className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500"
                  key={heading}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(([name, role, department, status]) => (
              <tr className="border-b border-white/[0.03]" key={name}>
                <td className="px-4 py-4 text-sm font-semibold text-white">
                  {name}
                </td>
                <td className="px-4 py-4 text-sm text-slate-400">{role}</td>
                <td className="px-4 py-4 text-sm text-slate-400">
                  {department}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

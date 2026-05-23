"use client";

import { DashboardLayout } from "../../components/dashboard-layout";

const attendance = [
  ["Monday", "235", "12", "95.1%"],
  ["Tuesday", "240", "7", "97.2%"],
  ["Wednesday", "238", "9", "96.4%"],
  ["Thursday", "232", "15", "93.9%"],
  ["Friday", "228", "19", "92.3%"],
];

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Attendance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Weekly attendance monitoring and absence summary.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {attendance.map(([day, present, absent, rate]) => (
          <div className="glass rounded-xl p-5" key={day}>
            <p className="text-sm font-semibold text-slate-400">{day}</p>
            <p className="mt-3 text-3xl font-bold text-white">{rate}</p>
            <p className="mt-3 text-xs text-slate-500">
              {present} present, {absent} absent
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

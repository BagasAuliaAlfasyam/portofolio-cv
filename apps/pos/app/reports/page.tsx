import Link from "next/link";

const reports = [
  ["Daily Revenue", "Rp 18.5M", "+22%"],
  ["Average Basket", "Rp 146K", "+8%"],
  ["Refund Rate", "0.8%", "-0.2%"],
  ["QRIS Share", "42%", "+6%"],
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-emerald-400" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          Management sales metrics for daily store operations.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reports.map(([label, value, change]) => (
            <div className="glass rounded-xl p-5" key={label}>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{value}</p>
              <p className="mt-2 text-xs text-emerald-400">{change}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

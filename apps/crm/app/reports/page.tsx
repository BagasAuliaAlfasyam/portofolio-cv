import Link from "next/link";

const metrics = [
  ["Average Deal Size", "Rp 215M"],
  ["Sales Cycle", "21 days"],
  ["Win Rate", "32%"],
  ["Response SLA", "4h"],
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] p-6 text-[#172033]">
      <Link className="text-base font-bold text-[#E8531A]" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B3A5C]">
          Reports
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Management-level CRM metrics and forecast indicators.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={label}
            >
              <p className="text-base font-semibold text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-bold text-[#1B3A5C]">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

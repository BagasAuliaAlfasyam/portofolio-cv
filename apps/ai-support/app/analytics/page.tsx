import Link from "next/link";

const metrics = [
  ["Resolution Rate", "94.2%", "Automated answer success"],
  ["Avg Response", "1.8s", "Assistant reply latency"],
  ["Escalations", "12", "Human handoff this week"],
  ["CSAT", "4.8/5", "Support quality score"],
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-indigo-400" href="/">
        Back to chat
      </Link>
      <section className="mt-8">
        <h1 className="text-2xl font-bold text-white">Agent Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Operational metrics for AI support quality and escalation readiness.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value, note]) => (
            <article className="glass rounded-xl p-5" key={label}>
              <p className="text-sm font-semibold text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{value}</p>
              <p className="mt-2 text-xs text-slate-500">{note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

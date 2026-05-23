import Link from "next/link";

const stages = [
  ["Lead", "1", "Rp 95M"],
  ["Qualified", "1", "Rp 260M"],
  ["Proposal", "2", "Rp 205M"],
  ["Negotiation", "1", "Rp 420M"],
  ["Closed Won", "1", "Rp 310M"],
];

export default function PipelinePage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] p-6 text-[#172033]">
      <Link className="text-base font-bold text-[#E8531A]" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B3A5C]">
          Pipeline
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Dedicated sales-stage overview for CRM opportunities.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stages.map(([stage, count, value]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={stage}
            >
              <h2 className="text-lg font-bold text-[#1B3A5C]">{stage}</h2>
              <p className="mt-4 text-3xl font-bold">{count}</p>
              <p className="mt-2 text-base text-slate-500">{value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

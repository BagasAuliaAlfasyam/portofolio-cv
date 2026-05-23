import Link from "next/link";

const steps = [
  "Survey dan legalitas lahan",
  "Rencana tanam dan panen",
  "Audit mutu dan K3",
  "Pelaporan stakeholder",
];

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-[#f8f4e9] px-5 py-12 text-[#17341f]">
      <Link className="text-sm font-bold text-[#1f5a35]" href="/">
        Back to home
      </Link>
      <section className="mx-auto mt-12 max-w-6xl">
        <h1 className="text-5xl font-black tracking-tight">Tata Kelola</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5f614f]">
          Route khusus untuk proses, SOP, audit, dan pelaporan perusahaan.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              className="rounded-md border border-emerald-950/10 bg-white p-6"
              key={step}
            >
              <p className="text-3xl font-black text-[#d7a332]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-lg font-black">{step}</h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

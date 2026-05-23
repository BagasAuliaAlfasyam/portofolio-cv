import Link from "next/link";

const programs = ["Konservasi", "Sirkularitas pabrik", "Air dan efluen"];

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-[#17341f] px-5 py-12 text-white">
      <Link className="text-sm font-bold text-[#f2c65d]" href="/">
        Back to home
      </Link>
      <section className="mx-auto mt-12 max-w-6xl">
        <h1 className="text-5xl font-black tracking-tight">Keberlanjutan</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d9dfcf]">
          Route khusus untuk program ESG, konservasi, dan dampak sosial.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {programs.map((program) => (
            <article
              className="rounded-md border border-white/12 bg-white/10 p-6"
              key={program}
            >
              <h2 className="text-xl font-black">{program}</h2>
              <p className="mt-3 text-sm leading-7 text-[#d9dfcf]">
                Placeholder program keberlanjutan.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

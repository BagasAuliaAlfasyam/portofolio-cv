import Link from "next/link";

const operations = [
  "Perkebunan inti dan plasma",
  "Pengolahan CPO dan kernel",
  "Logistik TBS",
  "Traceability produk",
];

export default function OperationsPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-12 text-[#17341f]">
      <Link className="text-sm font-bold text-[#1f5a35]" href="/">
        Back to home
      </Link>
      <section className="mx-auto mt-12 max-w-6xl">
        <h1 className="text-5xl font-black tracking-tight">Operasi</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5f614f]">
          Route khusus untuk menjelaskan rantai operasi dari kebun sampai
          distribusi.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {operations.map((item) => (
            <article
              className="rounded-md border border-emerald-950/10 bg-[#f8f4e9] p-6"
              key={item}
            >
              <h2 className="text-xl font-black">{item}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5f614f]">
                Placeholder konten operasional yang siap diperluas.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

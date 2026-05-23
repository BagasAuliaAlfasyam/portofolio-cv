import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f4e9] px-5 py-12 text-[#17341f]">
      <Link className="text-sm font-bold text-[#1f5a35]" href="/">
        Back to home
      </Link>
      <section className="mx-auto mt-12 max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a20]">
          Tentang perusahaan
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">
          Profil perusahaan perkebunan dan pengolahan sawit.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#5f614f]">
          Halaman ini disiapkan sebagai route khusus untuk narasi perusahaan,
          sejarah, cakupan operasional, dan posisi bisnis.
        </p>
      </section>
    </main>
  );
}

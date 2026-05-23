import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f4e9] px-5 py-12 text-[#17341f]">
      <Link className="text-sm font-bold text-[#1f5a35]" href="/">
        Back to home
      </Link>
      <section className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-black tracking-tight">Kontak</h1>
          <p className="mt-4 text-lg leading-8 text-[#5f614f]">
            Route khusus untuk inquiry bisnis, pengadaan, dan kemitraan.
          </p>
        </div>
        <form className="rounded-md border border-emerald-950/10 bg-white p-6">
          <label className="grid gap-2 text-sm font-bold">
            Email Perusahaan
            <input
              className="rounded-md border border-emerald-950/15 bg-[#f8f4e9] px-4 py-3"
              placeholder="nama@perusahaan.co.id"
              type="email"
            />
          </label>
          <button
            className="mt-5 rounded-md bg-[#1f5a35] px-5 py-3 text-sm font-bold text-white"
            type="button"
          >
            Kirim Inquiry
          </button>
        </form>
      </section>
    </main>
  );
}

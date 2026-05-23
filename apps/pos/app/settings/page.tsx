import Link from "next/link";

const settings = [
  "Receipt template",
  "Payment methods",
  "Tax and service charge",
  "Cashier permissions",
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-emerald-400" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          POS configuration modules for store operations.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {settings.map((setting) => (
            <div className="glass rounded-xl p-5" key={setting}>
              <h2 className="text-lg font-bold text-white">{setting}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Configuration placeholder ready for backend persistence.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

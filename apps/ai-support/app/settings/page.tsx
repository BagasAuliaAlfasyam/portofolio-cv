import Link from "next/link";

const settings = [
  "Agent persona",
  "Escalation trigger",
  "Business hours",
  "Response templates",
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background p-4 pb-40 text-slate-100 md:p-6 md:pb-44">
      <Link className="text-sm font-semibold text-indigo-400" href="/">
        Back to chat
      </Link>
      <section className="mt-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Agent Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Configuration pages for support automation behavior.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {settings.map((setting) => (
            <article className="glass rounded-xl p-5" key={setting}>
              <h2 className="text-lg font-bold text-white">{setting}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Configuration placeholder ready for backend persistence.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

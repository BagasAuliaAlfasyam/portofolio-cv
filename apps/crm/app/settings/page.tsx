import Link from "next/link";

const settings = [
  "Pipeline Stages",
  "Lead Assignment",
  "Follow-up Reminder",
  "Export Template",
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] p-6 text-[#172033]">
      <Link className="text-base font-bold text-[#E8531A]" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B3A5C]">
          Settings
        </h1>
        <p className="mt-2 text-base text-slate-600">
          CRM configuration pages for operational setup.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {settings.map((setting) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={setting}
            >
              <h2 className="text-lg font-bold text-[#1B3A5C]">{setting}</h2>
              <p className="mt-2 text-base text-slate-500">
                Configuration placeholder ready for API-backed persistence.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

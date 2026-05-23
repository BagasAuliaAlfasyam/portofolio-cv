import Link from "next/link";

const tasks = [
  [
    "Send revised HTE procurement scope",
    "PT Patra Drilling Contractor",
    "High",
  ],
  ["Follow up chatbot flow approval", "RS Prima Inti Medika", "Medium"],
  ["Prepare CRM discovery questions", "PT Sinar Teknologi Nusantara", "Medium"],
  ["Email POS demo access", "CV Mandiri Retailindo", "Low"],
];

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] p-6 text-[#172033]">
      <Link className="text-base font-bold text-[#E8531A]" href="/">
        Back to dashboard
      </Link>
      <section className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1B3A5C]">
          Tasks
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Follow-up queue for sales owners.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tasks.map(([title, company, priority]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={title}
            >
              <h2 className="text-lg font-bold text-[#172033]">{title}</h2>
              <p className="mt-2 text-base text-slate-500">{company}</p>
              <span className="mt-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-bold text-[#E8531A]">
                {priority}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

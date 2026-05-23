import Link from "next/link";

const articles = [
  "Account access and password recovery",
  "Product troubleshooting flow",
  "Billing and invoice inquiry",
  "Escalation policy for urgent issues",
];

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-indigo-400" href="/">
        Back to chat
      </Link>
      <section className="mt-8">
        <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI-ready support references and response policy entries.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <article className="glass rounded-xl p-5" key={article}>
              <h2 className="text-lg font-bold text-white">{article}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Placeholder article ready for retrieval and moderation metadata.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

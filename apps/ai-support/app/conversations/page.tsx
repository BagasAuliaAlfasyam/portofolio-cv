import Link from "next/link";

const conversations = [
  ["CS-8472-B", "Account management", "Open"],
  ["CS-8471-A", "Technical support", "Resolved"],
  ["CS-8469-C", "Product inquiry", "Escalated"],
];

export default function ConversationsPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-indigo-400" href="/">
        Back to chat
      </Link>
      <section className="glass mt-8 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white">Conversations</h1>
        <p className="mt-1 text-sm text-slate-500">
          Support session queue and lifecycle state.
        </p>
        <div className="mt-6 grid gap-3">
          {conversations.map(([id, topic, status]) => (
            <article
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
              key={id}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-indigo-300">{id}</p>
                  <p className="mt-1 text-sm text-slate-300">{topic}</p>
                </div>
                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                  {status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

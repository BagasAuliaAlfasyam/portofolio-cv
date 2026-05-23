import Link from "next/link";

const transactions = [
  ["TXN-001", "18:45", "Rp 125K", "Cash", "Completed"],
  ["TXN-002", "18:32", "Rp 287K", "QRIS", "Completed"],
  ["TXN-003", "18:20", "Rp 78K", "Cash", "Completed"],
  ["TXN-004", "18:05", "Rp 196K", "Card", "Completed"],
];

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-slate-100">
      <Link className="text-sm font-semibold text-emerald-400" href="/">
        Back to dashboard
      </Link>
      <section className="glass mt-8 overflow-hidden rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sales history with payment method and completion status.
        </p>
        <table className="mt-6 w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["ID", "Time", "Total", "Payment", "Status"].map((heading) => (
                <th
                  className="px-3 py-3 text-left text-[11px] uppercase tracking-wider text-slate-500"
                  key={heading}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr className="border-b border-white/[0.03]" key={transaction[0]}>
                {transaction.map((value) => (
                  <td className="px-3 py-4 text-sm text-slate-400" key={value}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

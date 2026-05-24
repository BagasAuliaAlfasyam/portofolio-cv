import { Banknote, CreditCard, Receipt, WalletCards } from "lucide-react";
import { formatCurrency, PosMetric, PosPageShell, PosPanel } from "../../components/feature-component";

const transactions = [
  ["TXN-1842", "16:48", 142000, "QRIS", "Completed"],
  ["TXN-1841", "16:39", 68000, "Cash", "Completed"],
  ["TXN-1840", "16:22", 211000, "Card", "Completed"],
  ["TXN-1839", "16:05", 52000, "QRIS", "Refunded"],
];

export default function TransactionsPage() {
  return (
    <PosPageShell eyebrow="Transactions" title="Sales history and payment audit">
      <div className="grid gap-4 md:grid-cols-4">
        <PosMetric icon={Receipt} label="Transactions" note="Today" value="127" />
        <PosMetric icon={WalletCards} label="QRIS share" note="Most used method" value="42%" />
        <PosMetric icon={Banknote} label="Cash drawer" note="Balanced" value="Rp 2.4M" />
        <PosMetric icon={CreditCard} label="Card payments" note="Settled" value="31" />
      </div>
      <PosPanel title="Transaction ledger">
        <div className="overflow-hidden rounded-lg border border-white/[0.08]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs font-black uppercase tracking-[0.12em] text-slate-500"><tr>{["ID", "Time", "Total", "Payment", "Status"].map((h) => <th className="px-4 py-3" key={h}>{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-white/[0.06]">{transactions.map(([id, time, total, payment, status]) => <tr key={id as string}><td className="px-4 py-4 font-black text-white">{id}</td><td className="px-4 py-4 font-semibold text-slate-400">{time}</td><td className="px-4 py-4 font-black text-emerald-300">{formatCurrency(total as number)}</td><td className="px-4 py-4 font-semibold text-slate-400">{payment}</td><td className="px-4 py-4"><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">{status}</span></td></tr>)}</tbody>
          </table>
        </div>
      </PosPanel>
    </PosPageShell>
  );
}

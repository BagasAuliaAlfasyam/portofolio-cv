import { BadgePercent, BarChart3, Receipt, TrendingUp } from "lucide-react";
import {
  PosMetric,
  PosPageShell,
  PosPanel,
} from "../../components/feature-component";

const topProducts = [
  ["Kopi Susu Gula Aren", "48 sold", "Rp 1.44M"],
  ["Nasi Goreng Special", "35 sold", "Rp 1.33M"],
  ["Matcha Latte", "32 sold", "Rp 1.08M"],
  ["French Fries", "28 sold", "Rp 700K"],
];

export default function ReportsPage() {
  return (
    <PosPageShell eyebrow="Reports" title="Daily store performance">
      <div className="grid gap-4 md:grid-cols-4">
        <PosMetric
          icon={TrendingUp}
          label="Daily revenue"
          note="+22% vs yesterday"
          value="Rp 18.5M"
        />
        <PosMetric
          icon={Receipt}
          label="Average basket"
          note="127 transactions"
          value="Rp 146K"
        />
        <PosMetric
          icon={BadgePercent}
          label="Discount rate"
          note="Campaign impact"
          value="2.3%"
        />
        <PosMetric
          icon={BarChart3}
          label="Gross margin"
          note="Estimated"
          value="61%"
        />
      </div>
      <PosPanel title="Top product contribution">
        <div className="grid gap-3 md:grid-cols-2">
          {topProducts.map(([name, sold, revenue]) => (
            <div
              className="rounded-lg border border-white/[0.08] bg-surface-50 p-4"
              key={name}
            >
              <p className="font-black text-white">{name}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {sold}
              </p>
              <p className="mt-3 text-lg font-black text-emerald-300">
                {revenue}
              </p>
            </div>
          ))}
        </div>
      </PosPanel>
    </PosPageShell>
  );
}

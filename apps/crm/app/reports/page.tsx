import { BarChart3, CircleDollarSign, Target, Timer } from "lucide-react";
import { CrmMetric, CrmPageShell, CrmPanel } from "../../components/feature-component";

const rows = [
  ["Website", "34", "Rp 225M", "28%"],
  ["Referral", "28", "Rp 420M", "41%"],
  ["LinkedIn", "21", "Rp 160M", "19%"],
  ["Outbound", "17", "Rp 95M", "14%"],
];

export default function ReportsPage() {
  return (
    <CrmPageShell eyebrow="Reports" title="Sales performance and forecast">
      <div className="grid gap-4 md:grid-cols-4">
        <CrmMetric icon={CircleDollarSign} label="Avg deal size" note="+8% quarter over quarter" value="Rp 215M" />
        <CrmMetric icon={Timer} label="Sales cycle" note="From lead to close" value="21d" />
        <CrmMetric icon={Target} label="Win rate" note="Weighted by value" value="32%" />
        <CrmMetric icon={BarChart3} label="Forecast accuracy" note="Last 90 days" value="87%" />
      </div>
      <CrmPanel title="Lead source performance">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              <tr>{["Source", "Leads", "Pipeline", "Win rate"].map((heading) => <th className="px-4 py-3" key={heading}>{heading}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td className="px-4 py-4 font-bold text-slate-700" key={cell}>{cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

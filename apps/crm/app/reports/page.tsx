import { BarChart3, CircleDollarSign, Target, Timer } from "lucide-react";
import {
  CrmMetric,
  CrmPageShell,
  CrmPanel,
} from "../../components/feature-component";

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
        <CrmMetric
          icon={CircleDollarSign}
          label="Avg deal size"
          note="+8% quarter over quarter"
          value="Rp 215M"
        />
        <CrmMetric
          icon={Timer}
          label="Sales cycle"
          note="From lead to close"
          value="21d"
        />
        <CrmMetric
          icon={Target}
          label="Win rate"
          note="Weighted by value"
          value="32%"
        />
        <CrmMetric
          icon={BarChart3}
          label="Forecast accuracy"
          note="Last 90 days"
          value="87%"
        />
      </div>
      <CrmPanel title="Lead source performance">
        <div className="grid gap-3 md:hidden">
          {rows.map(([source, leads, pipeline, winRate]) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-4"
              key={source}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-black text-[#1B3A5C]">{source}</p>
                <p className="font-black text-[#E8531A]">{pipeline}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    Leads
                  </p>
                  <p className="mt-1 font-bold text-slate-700">{leads}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    Win rate
                  </p>
                  <p className="mt-1 font-bold text-slate-700">{winRate}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block">
          <table className="min-w-[620px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              <tr>
                {["Source", "Leads", "Pipeline", "Win rate"].map((heading) => (
                  <th className="px-4 py-3" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td
                      className="px-4 py-4 font-bold text-slate-700"
                      key={cell}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

import { CalendarClock, CircleDollarSign, Plus, Target } from "lucide-react";
import { CrmActionButton } from "../../components/action-button";
import {
  CrmBadge,
  CrmMetric,
  CrmPageShell,
  CrmPanel,
} from "../../components/feature-component";

const columns = [
  {
    deals: [
      ["CV Mandiri Retailindo", "POS pilot for 3 stores", "Rp 95M"],
      ["Koperasi Amanah", "Member portal discovery", "Rp 72M"],
    ],
    name: "Lead",
    value: "Rp 167M",
  },
  {
    deals: [
      ["PT Sinar Teknologi Nusantara", "CRM and branch analytics", "Rp 260M"],
    ],
    name: "Qualified",
    value: "Rp 260M",
  },
  {
    deals: [
      ["RS Prima Inti Medika", "AI support chatbot", "Rp 160M"],
      ["Universitas Malikussaleh", "Research decision support", "Rp 45M"],
    ],
    name: "Proposal",
    value: "Rp 205M",
  },
  {
    deals: [
      ["PT Patra Drilling Contractor", "Procurement workflow", "Rp 420M"],
    ],
    name: "Negotiation",
    value: "Rp 420M",
  },
  {
    deals: [["PT Artha Karya Sentosa", "Customer portal", "Rp 310M"]],
    name: "Won",
    value: "Rp 310M",
  },
];

export default function PipelinePage() {
  return (
    <CrmPageShell
      actions={
        <CrmActionButton featureName="Buat opportunity baru">
          <Plus className="h-4 w-4" />
          New opportunity
        </CrmActionButton>
      }
      eyebrow="Pipeline"
      title="Stage-based opportunity board"
    >
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        <CrmMetric
          icon={CircleDollarSign}
          label="Open pipeline"
          note="Across 7 active deals"
          value="Rp 1.05B"
        />
        <CrmMetric
          icon={Target}
          label="Weighted forecast"
          note="Likely close this quarter"
          value="Rp 681M"
        />
        <CrmMetric
          icon={CalendarClock}
          label="Aging risk"
          note="2 deals over 21 days"
          value="2"
        />
      </div>
      <CrmPanel title="Deal kanban">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {columns.map((column) => (
            <div
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              key={column.name}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-[#1B3A5C]">
                    {column.name}
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {column.value}
                  </p>
                </div>
                <CrmBadge>{column.deals.length}</CrmBadge>
              </div>
              <div className="grid gap-3">
                {column.deals.map(([company, scope, value]) => (
                  <article
                    className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                    key={company}
                  >
                    <p className="font-black text-slate-900">{company}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {scope}
                    </p>
                    <p className="mt-3 text-sm font-black text-[#E8531A]">
                      {value}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

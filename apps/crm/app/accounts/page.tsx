import { Building2, Mail, Phone, Search, UserRound } from "lucide-react";
import { CrmBadge, CrmMetric, CrmPageShell, CrmPanel } from "../../components/feature-component";

const accounts = [
  ["PT Patra Drilling Contractor", "Energy", "Procurement Team", "Negotiation", "Bagas"],
  ["RS Prima Inti Medika", "Healthcare", "Silfa", "Proposal", "Bagas"],
  ["PT Sinar Teknologi Nusantara", "Distribution", "Ratna Wijaya", "Qualified", "Nadia"],
  ["CV Mandiri Retailindo", "Retail", "Hendra Gunawan", "Lead", "Fikri"],
];

export default function AccountsPage() {
  return (
    <CrmPageShell
      actions={
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none" placeholder="Search accounts..." />
        </div>
      }
      eyebrow="Accounts"
      title="Customer and prospect directory"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <CrmMetric icon={Building2} label="Active accounts" note="12 enterprise prospects" value="42" />
        <CrmMetric icon={UserRound} label="Decision makers" note="28 verified contacts" value="86" />
        <CrmMetric icon={Phone} label="Touches this week" note="Calls, emails, meetings" value="34" />
      </div>
      <CrmPanel title="Account portfolio">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              <tr>{["Company", "Industry", "Primary Contact", "Stage", "Owner", "Contact"].map((heading) => <th className="px-4 py-3" key={heading}>{heading}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {accounts.map(([company, industry, contact, stage, owner]) => (
                <tr key={company}>
                  <td className="px-4 py-4 font-black text-[#1B3A5C]">{company}</td>
                  <td className="px-4 py-4 font-semibold text-slate-600">{industry}</td>
                  <td className="px-4 py-4 font-semibold text-slate-700">{contact}</td>
                  <td className="px-4 py-4"><CrmBadge>{stage}</CrmBadge></td>
                  <td className="px-4 py-4 font-semibold text-slate-600">{owner}</td>
                  <td className="px-4 py-4"><div className="flex gap-2 text-slate-400"><Mail className="h-4 w-4" /><Phone className="h-4 w-4" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

import { Bell, LockKeyhole, SlidersHorizontal, Workflow, type LucideIcon } from "lucide-react";
import { CrmPageShell, CrmPanel } from "../../components/feature-component";

const settings: Array<{ description: string; icon: LucideIcon; title: string }> = [
  { description: "Define stage probability, SLA, and required fields.", icon: Workflow, title: "Pipeline stages" },
  { description: "Route inbound inquiries by source, segment, and owner capacity.", icon: SlidersHorizontal, title: "Lead assignment" },
  { description: "Configure alerts for overdue calls, emails, and proposals.", icon: Bell, title: "Follow-up reminders" },
  { description: "Prepare admin, manager, and sales-rep permissions.", icon: LockKeyhole, title: "Role access" },
];

export default function SettingsPage() {
  return (
    <CrmPageShell eyebrow="Settings" title="CRM operating configuration">
      <CrmPanel title="Workspace setup">
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map(({ description, icon: Icon, title }) => (
            <article className="rounded-lg border border-slate-200 bg-white p-5" key={title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F7EDE8] text-[#E8531A]">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-black text-[#1B3A5C]">{title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{description}</p>
            </article>
          ))}
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

import { CalendarClock, CheckCircle2, Mail, Phone } from "lucide-react";
import { CrmBadge, CrmMetric, CrmPageShell, CrmPanel } from "../../components/feature-component";

const tasks = [
  ["Send revised HTE procurement scope", "PT Patra Drilling Contractor", "Email", "Today 15:00", "High"],
  ["Follow up chatbot flow approval", "RS Prima Inti Medika", "Call", "Tomorrow 10:30", "Medium"],
  ["Prepare CRM discovery questions", "PT Sinar Teknologi Nusantara", "Meeting", "May 26", "Medium"],
  ["Email POS demo access", "CV Mandiri Retailindo", "Email", "May 28", "Low"],
];

export default function TasksPage() {
  return (
    <CrmPageShell eyebrow="Tasks" title="Follow-up activity queue">
      <div className="grid gap-4 md:grid-cols-3">
        <CrmMetric icon={CalendarClock} label="Due today" note="2 high priority" value="6" />
        <CrmMetric icon={CheckCircle2} label="Completed" note="This week" value="18" />
        <CrmMetric icon={Phone} label="Response SLA" note="Median first response" value="4h" />
      </div>
      <CrmPanel title="Priority follow-ups">
        <div className="grid gap-3">
          {tasks.map(([title, company, type, due, priority]) => (
            <article className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4" key={title}>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F7EDE8] text-[#E8531A]">
                  {type === "Email" ? <Mail className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-black text-slate-900">{title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{company} - {due}</p>
                </div>
              </div>
              <CrmBadge>{priority}</CrmBadge>
            </article>
          ))}
        </div>
      </CrmPanel>
    </CrmPageShell>
  );
}

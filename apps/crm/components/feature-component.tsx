import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  CheckCircle2,
  LayoutDashboard,
  Settings,
  Target,
  type LucideIcon,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Pipeline", href: "/pipeline", icon: Target },
  { label: "Accounts", href: "/accounts", icon: Building2 },
  { label: "Tasks", href: "/tasks", icon: CheckCircle2 },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function CrmPageShell({
  actions,
  children,
  eyebrow,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#172033]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B3A5C] text-white">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black">Catalyst CRM</p>
              <p className="text-xs font-semibold text-slate-500">Sales operating system</p>
            </div>
          </div>
          <nav className="grid gap-1 px-4 py-5">
            {navItems.map((item) => (
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                href={item.href}
                key={item.label}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="w-full p-4 md:p-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#E8531A]">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#1B3A5C] md:text-4xl">{title}</h1>
            </div>
            {actions}
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}

export function CrmMetric({
  icon: Icon,
  label,
  note,
  value,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-[#1B3A5C]">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F7EDE8] text-[#E8531A]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{note}</p>
    </div>
  );
}

export function CrmPanel({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-black text-[#1B3A5C]">{title}</h2>
      {children}
    </section>
  );
}

export function CrmBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-black text-[#E8531A]">
      {children}
    </span>
  );
}

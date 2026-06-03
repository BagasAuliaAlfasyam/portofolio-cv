"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactPersonModal } from "@repo/ui/contact-person-modal";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Zap,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Employees", href: "/employees" },
  { icon: CalendarDays, label: "Attendance", href: "/attendance" },
  { icon: DollarSign, label: "Payroll", href: "/payroll" },
  { icon: BarChart3, label: "Performance", href: "/performance" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [contactFeature, setContactFeature] = useState<string | null>(null);
  const pathname = usePathname();

  const showContact = (feature: string) => {
    setContactFeature(feature);
    setProfileOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {mobileSidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/55 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "lg:w-64" : "lg:w-[70px]"
        } fixed inset-y-0 left-0 z-40 flex w-[min(16rem,86vw)] flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:relative lg:translate-x-0 ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } shrink-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-violet flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">HRIS</span>
                <span className="text-[9px] text-slate-500 tracking-wider">
                  CATALYST FORGE
                </span>
              </div>
            )}
          </div>
          <button
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.04] hover:text-white lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                pathname === link.href
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
              }`}
              onClick={() => setMobileSidebarOpen(false)}
            >
              <link.icon
                className={`w-[18px] h-[18px] shrink-0 ${pathname === link.href ? "text-brand-400" : "text-slate-600 group-hover:text-slate-400"}`}
              />
              {(sidebarOpen || mobileSidebarOpen) && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar toggle */}
        <div className="p-3 border-t border-sidebar-border">
          {(sidebarOpen || mobileSidebarOpen) && (
            <div className="mb-3 rounded-xl border border-emerald-500/15 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-300">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Demo mode
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 transition-all hover:bg-white/[0.03] hover:text-slate-300 lg:flex"
          >
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] bg-background/80 px-3 backdrop-blur-xl sm:gap-3 sm:px-4 md:px-6">
          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              aria-label="Open navigation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-surface-50 text-slate-400 lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="relative hidden w-full max-w-md sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search employees, reports..."
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500/40 transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-300 md:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Demo mode
            </span>
            {/* Notifications */}
            <button
              onClick={() => showContact("Notifications")}
              className="relative w-9 h-9 rounded-lg bg-surface-50 border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-surface-100 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition-all hover:bg-surface-50 sm:px-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-violet flex items-center justify-center text-white text-xs font-bold">
                  AD
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-white">
                    Admin User
                  </div>
                  <div className="text-[10px] text-slate-500">Super Admin</div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 py-2 rounded-xl bg-surface-100 border border-white/[0.08] shadow-2xl z-50">
                  <button
                    onClick={() => showContact("Profile")}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  >
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={() => showContact("Settings")}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <hr className="my-1 border-white/[0.06]" />
                  <button
                    onClick={() => showContact("Logout")}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-400 hover:bg-white/[0.04]"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 pb-40 app-fade-in md:p-6 md:pb-44">
          {children}
        </main>
      </div>
      <ContactPersonModal
        open={Boolean(contactFeature)}
        onClose={() => setContactFeature(null)}
        featureName={contactFeature ?? undefined}
        appName="HRIS System"
      />
    </div>
  );
}

"use client";

import { Building2, Users, Award, TrendingUp } from "lucide-react";

const clients = [
  {
    name: "PT Patra Drilling Contractor",
    type: "Enterprise Client",
    description:
      "Built an end-to-end operational management system with real-time drilling analytics, crew scheduling, and automated compliance reporting.",
    industry: "Oil & Gas",
    projects: "3 Systems Delivered",
  },
];

const stats = [
  { icon: Building2, value: "50+", label: "Projects Completed", color: "text-blue-400" },
  { icon: Users, value: "20+", label: "Happy Clients", color: "text-emerald-400" },
  { icon: Award, value: "99%", label: "Client Satisfaction", color: "text-amber-400" },
  { icon: TrendingUp, value: "3x", label: "Average ROI", color: "text-violet-400" },
];

export function Clients() {
  return (
    <section id="clients" className="section-padding relative">
      <div className="container-max mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
            <Building2 className="w-3.5 h-3.5" />
            OUR CLIENTS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From oil &amp; gas enterprises to growing startups — we deliver results that matter.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 text-center glass-hover group"
            >
              <stat.icon
                className={`w-6 h-6 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
              />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured client */}
        {clients.map((client) => (
          <div
            key={client.name}
            className="glass rounded-2xl p-8 md:p-10 glow-border"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logo placeholder */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/25 shrink-0">
                PD
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{client.name}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {client.type}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-2xl">
                  {client.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-xs rounded-lg bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    🏭 {client.industry}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-lg bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    📦 {client.projects}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Individual projects */}
        <div className="mt-8 text-center">
          <div className="glass rounded-xl p-6 inline-flex items-center gap-4">
            <div className="text-4xl font-bold gradient-text">50+</div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">Individual Projects</div>
              <div className="text-xs text-slate-500">
                Across SaaS, AI, Mobile, and Cloud solutions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

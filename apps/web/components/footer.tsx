"use client";

import { Zap, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "HRIS System", href: "https://hris.catalystforge.id" },
    { label: "CRM System", href: "https://crm.catalystforge.id" },
    { label: "POS System", href: "https://pos.catalystforge.id" },
    { label: "Project Management", href: "https://project.catalystforge.id" },
  ],
  "AI Solutions": [
    { label: "AI Support Agent", href: "https://ai-support.catalystforge.id" },
    { label: "AI HR Assistant", href: "https://ai-hr.catalystforge.id" },
    { label: "AI Analytics", href: "https://ai-analytics.catalystforge.id" },
    { label: "AI Document Processor", href: "https://ai-docs.catalystforge.id" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Our Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Main footer */}
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-violet flex items-center justify-center shadow-lg shadow-brand-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  Catalyst<span className="text-brand-400">Forge</span>
                </span>
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              AI-driven software engineering company building scalable SaaS products 
              and enterprise-grade digital solutions on Google Cloud Platform.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/catalystforge" },
                { icon: Linkedin, href: "https://linkedin.com/company/catalystforge" },
                { icon: Twitter, href: "https://twitter.com/catalystforge" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.href.startsWith("http") && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Catalyst Forge. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Built with</span>
            <span className="text-brand-400">♥</span>
            <span>using Next.js, FastAPI & GCP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

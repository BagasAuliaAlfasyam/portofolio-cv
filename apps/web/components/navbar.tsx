"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "AI Solutions", href: "#ai-products" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-accent-violet flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-all duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-violet/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">
                Catalyst<span className="text-brand-400">Forge</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-widest uppercase -mt-1">
                AI Engineering
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#products"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Live Demos
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-violet rounded-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Your Project
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <div className="md:hidden pb-6 animate-slide-down">
            <div className="flex flex-col gap-1 mt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                <a
                  href="#contact"
                  className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-violet rounded-lg text-center"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

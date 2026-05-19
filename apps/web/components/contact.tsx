"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { ContactPersonModal } from "@repo/ui/contact-person-modal";

export function Contact() {
  const [contactFeature, setContactFeature] = useState<string | null>(null);

  return (
    <section id="contact" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-500/[0.04] blur-[120px]" />
      </div>

      <div className="container-max mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-4">
            <Mail className="w-3.5 h-3.5" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Let&apos;s Build <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to transform your business with AI-powered digital products? 
            Let&apos;s discuss your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-7 glow-border">
              <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Email</div>
                    <a
                      href="mailto:hello@catalystforge.id"
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      hello@catalystforge.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Phone</div>
                    <a
                      href="tel:+6281234567890"
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Location</div>
                    <div className="text-sm text-slate-300">
                      Jakarta, Indonesia
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="glass rounded-2xl p-7 bg-gradient-to-br from-brand-500/[0.08] to-accent-violet/[0.05] border-brand-500/20">
              <h3 className="text-base font-bold text-white mb-2">
                Prefer a quick call?
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Schedule a free 30-minute consultation to discuss your project.
              </p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setContactFeature("Schedule Meeting");
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Schedule Meeting <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-7 md:p-9 glow-border">
              <h3 className="text-lg font-bold text-white mb-6">
                Send us a message
              </h3>
              <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault();
                setContactFeature("Contact form submission");
              }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-11 px-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full h-11 px-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full h-11 px-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Project Type
                  </label>
                  <select className="w-full h-11 px-4 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all appearance-none">
                    <option value="">Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="llm">LLM & AI Agents</option>
                    <option value="saas">SaaS Product</option>
                    <option value="cloud">Cloud & DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg bg-surface-50 border border-white/[0.06] text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 px-6 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-violet rounded-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ContactPersonModal
        open={Boolean(contactFeature)}
        onClose={() => setContactFeature(null)}
        featureName={contactFeature ?? undefined}
        appName="Catalyst Forge website"
      />
    </section>
  );
}

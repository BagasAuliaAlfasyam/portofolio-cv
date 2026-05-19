"use client";

import { useState } from "react";
import {
  MessageSquareText,
  UserCog,
  LineChart,
  FileSearch,
  Lightbulb,
  ArrowUpRight,
  Brain,
  Sparkles,
} from "lucide-react";
import { ContactPersonModal } from "@repo/ui/contact-person-modal";

const aiProducts = [
  {
    name: "AI Customer Support Agent",
    description:
      "LLM-powered conversational agent that handles customer inquiries, resolves tickets, and escalates complex issues with contextual understanding.",
    href: "https://ai-support.catalystforge.id",
    icon: MessageSquareText,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    capabilities: ["Natural Language Understanding", "Multi-turn Conversations", "Ticket Resolution", "Smart Escalation"],
  },
  {
    name: "AI HR Assistant",
    description:
      "Intelligent HR automation handling employee onboarding, policy Q&A, leave management, and workforce analytics with predictive capabilities.",
    href: "https://ai-hr.catalystforge.id",
    icon: UserCog,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    capabilities: ["Policy Q&A Bot", "Onboarding Automation", "Sentiment Analysis", "Attrition Prediction"],
  },
  {
    name: "AI Analytics Dashboard",
    description:
      "Deep learning-powered analytics platform providing predictive insights, anomaly detection, and automated reporting across business metrics.",
    href: "https://ai-analytics.catalystforge.id",
    icon: LineChart,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    capabilities: ["Predictive Analytics", "Anomaly Detection", "Auto Reporting", "Trend Forecasting"],
  },
  {
    name: "AI Document Processor",
    description:
      "Automated document processing with OCR, named entity extraction, classification, and intelligent data routing using transformer models.",
    href: "https://ai-docs.catalystforge.id",
    icon: FileSearch,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    capabilities: ["OCR Processing", "Entity Extraction", "Document Classification", "Data Routing"],
  },
  {
    name: "AI Recommendation Engine",
    description:
      "Collaborative and content-based recommendation system with real-time personalization, A/B testing support, and engagement optimization.",
    href: "https://ai-recommendation.catalystforge.id",
    icon: Lightbulb,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    capabilities: ["Collaborative Filtering", "Content-Based", "Real-time Personalization", "A/B Testing"],
  },
];

export function AiProducts() {
  const [contactFeature, setContactFeature] = useState<string | null>(null);

  return (
    <section id="ai-products" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent pointer-events-none" />

      <div className="container-max mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-accent-violet text-xs font-medium mb-4">
            <Brain className="w-3.5 h-3.5" />
            AI SOLUTIONS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Intelligent <span className="gradient-text-warm">AI Products</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Enterprise-grade AI systems powered by LLMs, deep learning, and machine learning — 
            deployed and production-ready.
          </p>
        </div>

        {/* AI product cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiProducts.map((product, i) => (
            <div
              key={product.name}
              className="group relative rounded-2xl overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <div className="absolute inset-[1px] bg-surface-50 rounded-2xl" />

              {/* Card content */}
              <div className="relative p-7 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-5 h-5 text-white" />
                  </div>
                  <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                  {product.description}
                </p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-2 py-0.5 text-[10px] font-medium rounded bg-white/[0.04] text-slate-500 border border-white/[0.06]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setContactFeature(`${product.name} live demo`)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors group/link"
                >
                  Try Live Demo
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactPersonModal
        open={Boolean(contactFeature)}
        onClose={() => setContactFeature(null)}
        featureName={contactFeature ?? undefined}
        appName="AI Solutions showcase"
      />
    </section>
  );
}

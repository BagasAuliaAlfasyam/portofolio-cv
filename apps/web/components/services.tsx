"use client";

import {
  Globe,
  Smartphone,
  Brain,
  Bot,
  Cloud,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    subtitle: "End-to-End",
    description:
      "Full-stack web applications built with Next.js, React, and FastAPI. From design to deployment on GCP.",
    highlights: [
      "Next.js / React",
      "FastAPI Backend",
      "PostgreSQL",
      "Cloud Run",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    subtitle: "End-to-End",
    description:
      "Cross-platform mobile applications with React Native and Flutter, backed by robust API architecture.",
    highlights: ["React Native", "Flutter", "REST APIs", "Push Notifications"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    subtitle: "Deep Learning & ML",
    description:
      "Custom ML models, predictive analytics, computer vision, and NLP solutions deployed at scale.",
    highlights: ["TensorFlow", "PyTorch", "Scikit-learn", "MLOps"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Bot,
    title: "LLM & AI Agents",
    subtitle: "Generative AI",
    description:
      "LLM-powered chatbots, AI agents, RAG systems, and intelligent automation using GPT, Gemini, and open-source models.",
    highlights: [
      "LangChain",
      "RAG Systems",
      "Fine-tuning",
      "Agent Orchestration",
    ],
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Google Cloud Platform",
    description:
      "Cloud architecture, CI/CD pipelines, container orchestration, and infrastructure as code on GCP.",
    highlights: ["Cloud Run", "Cloud SQL", "Cloud Build", "Terraform"],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-max mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Wrench className="w-3.5 h-3.5" />
            SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            End-to-end engineering services from concept to cloud deployment,
            powered by modern tech and AI.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl glow-border"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>

              {/* Title */}
              <div className="mb-1">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {service.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {service.subtitle}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mt-3 mb-5">
                {service.description}
              </p>

              {/* Tech highlights */}
              <div className="flex flex-wrap gap-1.5">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded ${service.bg} ${service.color} border ${service.border}`}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="group relative rounded-2xl border border-dashed border-slate-700 hover:border-brand-500/40 p-7 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-brand-500/[0.03]">
            <div className="w-14 h-14 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-brand-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Custom Solution?
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Let&apos;s discuss your specific requirements and build something
              amazing.
            </p>
            <a
              href="#contact"
              className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

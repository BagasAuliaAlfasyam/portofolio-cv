"use client";

import {
  Search,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  GraduationCap,
  HeartHandshake,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Deep-dive into your business requirements, user needs, and technical constraints. We map out the entire ecosystem before writing a single line of code.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "System Design",
    description:
      "Architecture design, database modeling, API contracts, and infrastructure planning. Every component is designed for scalability and maintainability.",
    icon: PenTool,
    color: "from-violet-500 to-purple-500",
  },
  {
    number: "03",
    title: "Development Sprint",
    description:
      "Agile development with 2-week sprints, daily standups, and continuous delivery. You see progress every single day with working demos.",
    icon: Code2,
    color: "from-emerald-500 to-teal-500",
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Comprehensive testing: unit tests, integration tests, E2E tests, load testing, and security audits. We ship with confidence.",
    icon: TestTube2,
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "05",
    title: "Deployment (GCP)",
    description:
      "Zero-downtime deployment on Google Cloud Platform with Cloud Run, Cloud SQL, and automated CI/CD pipelines. Production-grade from day one.",
    icon: Rocket,
    color: "from-rose-500 to-pink-500",
  },
  {
    number: "06",
    title: "Training",
    description:
      "Hands-on training for your team with documentation, video walkthroughs, and knowledge transfer sessions. Your team becomes self-sufficient.",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
  },
  {
    number: "07",
    title: "Support & Scaling",
    description:
      "Ongoing support, monitoring, performance optimization, and feature expansion. We grow with your business and scale as you need.",
    icon: HeartHandshake,
    color: "from-cyan-500 to-teal-500",
  },
];

export function HowWeWork() {
  return (
    <section id="process" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none" />

      <div className="container-max mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <Code2 className="w-3.5 h-3.5" />
            OUR PROCESS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            How We <span className="gradient-text-warm">Work</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A battle-tested engineering process refined across 50+ projects, 
            from discovery to production deployment.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-accent-violet/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex items-start gap-6 sm:gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <div className="glass rounded-xl p-6 glass-hover group hover:-translate-y-0.5 transition-all duration-300 inline-block w-full">
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-500">
                          STEP {step.number}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-brand-500 shadow-lg shadow-brand-500/30 hidden sm:block mt-8" />

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

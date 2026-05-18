"use client";

import {
  Users,
  BarChart3,
  ShoppingCart,
  FolderKanban,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "HRIS System",
    description:
      "Complete human resource information system with employee management, payroll processing, attendance tracking, and performance analytics.",
    href: "http://localhost:3001",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "React Query"],
    features: ["Employee Database", "Payroll Engine", "Leave Management", "Performance Reviews"],
  },
  {
    name: "CRM System",
    description:
      "Enterprise customer relationship management with pipeline tracking, deal management, contact enrichment, and AI-powered insights.",
    href: "http://localhost:3002",
    icon: BarChart3,
    color: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/20",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Recharts"],
    features: ["Pipeline Management", "Deal Tracking", "Contact CRM", "AI Insights"],
  },
  {
    name: "POS System",
    description:
      "Modern point-of-sale system with inventory management, real-time sales tracking, multi-store support, and automated reporting.",
    href: "http://localhost:3003",
    icon: ShoppingCart,
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "WebSocket"],
    features: ["Inventory Control", "Sales Analytics", "Multi-Store", "Receipt Generation"],
  },
  {
    name: "AI Support Hub",
    description:
      "Intelligent conversational agent integrating RAG, prompt engineering, and semantic search for unparalleled customer support.",
    href: "http://localhost:3004",
    icon: FolderKanban,
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
    tech: ["Next.js", "FastAPI", "OpenAI", "LangChain"],
    features: ["LLM Streaming", "Context Memory", "Action Buttons", "Agent Analytics"],
  },
  {
    name: "Company Profile Platform",
    description:
      "Modern, ultra-fast corporate presence platform with headless CMS integration, localized content, and dynamic interactive 3D elements.",
    href: "http://localhost:3005",
    icon: Layers,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js", "GraphQL", "Sanity CMS", "Redis", "GCP"],
    features: ["SEO Optimized", "Headless CMS", "i18n Localization", "Web Analytics"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function Products() {
  return (
    <section id="products" className="section-padding relative">
      <div className="container-max mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Ecosystem Showcases
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-cyan">Custom Solutions</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We build scalable, technology-agnostic architectures tailored to your specific enterprise needs. 
            The ecosystem below serves as a showcase of the custom-built, production-ready capabilities we deliver.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              key={product.name}
              className="group relative rounded-3xl glass p-8 transition-all duration-300 border border-white/[0.04] overflow-hidden"
            >
              {/* Animated glow background */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl blur-xl`} />
              
              <div className="relative z-10">
                {/* Header row */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg ${product.shadow} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <product.icon className="w-7 h-7 text-white" />
                  </div>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.1] text-white border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-300 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 min-h-[60px]">
                  {product.description}
                </p>

                {/* Tags Section */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-100 text-slate-300 border border-white/[0.06] group-hover:border-white/[0.12] transition-colors"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                    {product.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-brand-500/[0.08] text-brand-400 border border-brand-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

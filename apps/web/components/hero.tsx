"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles, Globe, Cpu, Cloud, Code2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.08] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/[0.05] blur-[100px] animate-pulse-slow delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/[0.03] blur-[150px] animate-float" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </motion.div>

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.05] mb-8 cursor-pointer hover:bg-white/[0.05] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              Versatile Engineering Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 block pb-2">
              We Engineer
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Enterprise Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed text-balance font-light"
          >
            Catalyst Forge is a full-cycle software engineering agency. We architect, build, and deploy 
            <span className="text-slate-200 font-medium"> scalable web platforms</span>, 
            <span className="text-slate-200 font-medium"> complex SaaS ecosystems</span>, and 
            <span className="text-slate-200 font-medium"> intelligent AI integrations</span> tailored to your needs.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto"
          >
            <a
              href="#products"
              className="group relative w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors" />
                Explore Ecosystem
              </div>
            </a>
            <a
              href="#contact"
              className="group relative w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center gap-2">
                Build With Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl mx-auto"
          >
            {[
              { icon: Globe, value: "100%", label: "Cloud Native", color: "text-blue-400" },
              { icon: Cpu, value: "4", label: "SaaS Products", color: "text-indigo-400" },
              { icon: Sparkles, value: "OpenAI", label: "LLM Integrated", color: "text-pink-400" },
              { icon: Cloud, value: "GCP", label: "Enterprise Ready", color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                key={stat.label}
                className="relative overflow-hidden glass rounded-2xl p-6 group cursor-default border border-white/[0.04]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent" />
                <stat.icon className={`w-6 h-6 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060a] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

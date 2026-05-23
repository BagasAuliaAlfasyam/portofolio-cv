import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ParallaxLayer } from "./parallax-layer";
import { Reveal } from "./reveal";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
  const heroLabels =
    messages.locale === "id"
      ? {
          badge: "Company Profile & Sistem Bisnis",
          preview: "Snapshot Proyek",
          dashboard: "Digital Delivery",
          scope: "Scope",
          sprint: "Sprint",
          security: "Review",
        }
      : {
          badge: "Company Profile & Business Systems",
          preview: "Project Snapshot",
          dashboard: "Digital Delivery",
          scope: "Scope",
          sprint: "Sprint",
          security: "Review",
        };
  const previewItems = messages.hero.trustIndicators.slice(0, 3);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#1B3A5C] text-white"
      id="top"
    >
      <ParallaxLayer
        className="-inset-y-32 circuit-pattern opacity-90"
        maxOffset={120}
        speed={0.18}
      />
      <ParallaxLayer
        className="-inset-y-32 bg-[linear-gradient(115deg,transparent_0%,transparent_38%,rgba(244,120,74,0.22)_38%,rgba(244,120,74,0.22)_39%,transparent_39%,transparent_100%)]"
        maxOffset={110}
        speed={-0.16}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,120,74,0.18),transparent_30%),linear-gradient(135deg,rgba(27,58,92,0.86),rgba(27,58,92,0.76))]" />

      <div className="section-container relative grid min-h-[680px] items-center gap-12 py-24 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
        <ParallaxLayer
          className="fade-in max-w-4xl"
          maxOffset={64}
          speed={-0.08}
        >
          <Reveal direction="left">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white">
              <Building2 className="h-5 w-5 text-[#F4784A]" />
              {heroLabels.badge}
            </div>
          </Reveal>
          <Reveal delay={90} direction="left">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {messages.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={170} direction="left">
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/88 md:text-xl">
              {messages.hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={250} direction="left">
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#E8531A] px-7 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#F4784A]"
                href="#products"
              >
                {messages.hero.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white px-7 py-4 text-base font-bold text-white transition hover:bg-white hover:text-[#1B3A5C]"
                href="#contact"
              >
                {messages.hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <div className="mt-9 flex flex-wrap gap-3">
            {messages.hero.trustIndicators.map((indicator, index) => (
              <Reveal
                delay={320 + index * 70}
                direction={index % 2 === 0 ? "left" : "right"}
                key={indicator}
              >
                <span className="block rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white">
                  {indicator}
                </span>
              </Reveal>
            ))}
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          className="fade-in hidden lg:block"
          maxOffset={88}
          speed={0.12}
        >
          <Reveal direction="right">
          <div className="motion-float-slow relative rounded-lg border border-white/16 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="motion-sheen rounded-lg bg-white p-5 text-[#1A1A2E] shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#E8531A]" />
                  <span className="h-3 w-3 rounded-full bg-[#F4B350]" />
                  <span className="h-3 w-3 rounded-full bg-[#3BAA72]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#1B3A5C]/60">
                  {heroLabels.preview}
                </span>
              </div>

              <div className="mt-6 rounded-lg border border-slate-200 bg-[#FAF8F5] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#E8531A]">
                      {heroLabels.dashboard}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-[#1B3A5C]">
                      {messages.products.eyebrow}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#E8531A] shadow-sm">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: Layers3, label: heroLabels.scope },
                    { icon: Sparkles, label: heroLabels.sprint },
                    { icon: ShieldCheck, label: heroLabels.security },
                  ].map(({ icon: Icon, label }, index) => (
                    <div
                      className="rounded-md bg-white p-3 shadow-sm"
                      key={label}
                    >
                      <Icon className="h-5 w-5 text-[#E8531A]" />
                      <p className="mt-3 text-sm font-bold text-[#1B3A5C]">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#1A1A2E]/58">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {previewItems.map((item, index) => (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E8531A]/40"
                    key={item}
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E8531A]" />
                    <span className="text-base font-bold text-[#1B3A5C]">
                      {item}
                    </span>
                    <span className="ml-auto text-sm font-bold text-[#1B3A5C]/36">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        </ParallaxLayer>
      </div>
    </section>
  );
}

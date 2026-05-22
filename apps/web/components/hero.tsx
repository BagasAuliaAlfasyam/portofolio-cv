import { ArrowRight, Building2 } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ParallaxLayer } from "./parallax-layer";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
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
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white">
            <Building2 className="h-5 w-5 text-[#F4784A]" />
            {messages.brand.tagline}
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {messages.hero.headline}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/88 md:text-xl">
            {messages.hero.subheadline}
          </p>

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

          <div className="mt-9 flex flex-wrap gap-3">
            {messages.hero.trustIndicators.map((indicator) => (
              <span
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white"
                key={indicator}
              >
                {indicator}
              </span>
            ))}
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          className="fade-in hidden lg:block"
          maxOffset={88}
          speed={0.12}
        >
          <div className="rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="grid gap-5">
              {messages.trustBar.items.map((item) => (
                <div
                  className="rounded-xl border border-white/15 bg-white/10 p-6"
                  key={item.label}
                >
                  <p className="text-4xl font-bold tracking-tight text-[#F4784A]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-white/86">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
}

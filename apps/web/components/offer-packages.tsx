import { ArrowRight, CheckCircle2, Clock3, Rocket } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type OfferPackagesProps = {
  messages: Messages;
};

export function OfferPackages({ messages }: OfferPackagesProps) {
  const timelineLabel = messages.locale === "id" ? "Estimasi" : "Estimate";

  return (
    <section className="section-padding overflow-hidden bg-[#FAF8F5]">
      <div className="section-container">
        <ScrollParallax className="max-w-3xl scroll-mt-40" id="offers">
          <Reveal direction="left">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.offers.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              {messages.offers.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:mt-6 sm:text-lg">
              {messages.offers.description}
            </p>
          </Reveal>
        </ScrollParallax>

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {messages.offers.items.map((offer, index) => (
            <Reveal
              className="h-full"
              delay={index * 110}
              direction={index % 2 === 0 ? "left" : "right"}
              key={offer.name}
            >
              <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#E8531A]/30 hover:shadow-xl sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#FFF4EF] text-[#E8531A]">
                    <Rocket className="h-7 w-7" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1B3A5C]/12 bg-[#FAF8F5] px-3 py-1.5 text-xs font-bold text-[#1B3A5C]">
                    <Clock3 className="h-4 w-4 text-[#E8531A]" />
                    {timelineLabel}: {offer.timeline}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#1B3A5C]">
                  {offer.name}
                </h3>
                <p className="mt-3 text-base font-semibold leading-relaxed text-[#1A1A2E]/70">
                  {offer.bestFor}
                </p>

                <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6">
                  {offer.deliverables.map((item) => (
                    <div className="flex gap-3" key={item}>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8531A]" />
                      <span className="text-sm font-semibold leading-6 text-[#1A1A2E]/76">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  className="mt-7 inline-flex items-center gap-2 text-base font-bold text-[#E8531A] transition hover:text-[#1B3A5C] lg:mt-auto lg:pt-7"
                  href={offer.href}
                >
                  {messages.offers.detailCta}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

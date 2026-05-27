import { CheckCircle2, MapPin, Network, ShieldCheck } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type AboutCompanyProps = {
  messages: Messages;
};

const valueIcons = [MapPin, Network, ShieldCheck];

export function AboutCompany({ messages }: AboutCompanyProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="section-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        <ScrollParallax
          className="max-w-3xl scroll-mt-40"
          id="about"
          maxOffset={34}
        >
          <Reveal direction="left">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.about.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              {messages.about.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:mt-6 sm:text-lg">
              {messages.about.description}
            </p>

            <div className="mt-7 grid gap-4 sm:mt-8">
              {messages.about.highlights.map((highlight) => (
                <div className="flex gap-3" key={highlight}>
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#E8531A]" />
                  <p className="text-base leading-relaxed text-[#1A1A2E]/76">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </ScrollParallax>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 lg:gap-5">
          {messages.about.values.map((value, index) => {
            const Icon = valueIcons[index] ?? ShieldCheck;

            return (
              <ScrollParallax
                direction="up"
                key={value.label}
                maxOffset={26 + index * 6}
              >
                <Reveal
                  delay={index * 110}
                  direction={index % 2 === 0 ? "right" : "left"}
                >
                  <article className="h-full rounded-lg border border-slate-200 bg-[#FAF8F5] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
                    <div className="flex items-start gap-4 md:flex-col lg:flex-row">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#E8531A] shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-[#1B3A5C]">
                          {value.label}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-[#1A1A2E]/72">
                          {value.text}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </ScrollParallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}

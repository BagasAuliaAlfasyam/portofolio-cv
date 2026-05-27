import { CheckCircle2, FileText, Target } from "lucide-react";
import { type ReactNode } from "react";
import { type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type CaseStudiesProps = {
  messages: Messages;
};

export function CaseStudies({ messages }: CaseStudiesProps) {
  return (
    <section className="section-padding overflow-hidden bg-[#FAF8F5]">
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl scroll-mt-40 text-center"
          id="projects"
          maxOffset={38}
        >
          <Reveal direction="up">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.caseStudies.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              {messages.caseStudies.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:mt-6 sm:text-lg">
              {messages.caseStudies.description}
            </p>
          </Reveal>
        </ScrollParallax>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {messages.caseStudies.items.map((item, index) => (
            <Reveal
              className="h-full"
              delay={index * 120}
              direction={index % 2 === 0 ? "left" : "right"}
              key={`${item.project}-${item.client}`}
            >
              <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-7">
                <p className="text-base font-bold uppercase tracking-[0.14em] text-[#E8531A]">
                  {item.context}
                </p>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-[#1B3A5C] sm:text-2xl">
                  {item.project}
                </h3>
                <p className="mt-2 text-base font-semibold leading-relaxed text-[#1A1A2E]/72">
                  {item.client}
                </p>

                <div className="mt-7 grid gap-5 border-t border-slate-200 pt-6">
                  <CaseStudyPoint
                    icon={<Target className="h-5 w-5" />}
                    label={messages.caseStudies.problemLabel}
                    text={item.problem}
                  />
                  <CaseStudyPoint
                    icon={<FileText className="h-5 w-5" />}
                    label={messages.caseStudies.solutionLabel}
                    text={item.solution}
                  />
                  <CaseStudyPoint
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    label={messages.caseStudies.impactLabel}
                    text={item.impact}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyPoint({
  icon,
  label,
  text,
}: {
  icon: ReactNode;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#E8531A]">
        {icon}
      </div>
      <div>
        <p className="text-base font-bold text-[#1B3A5C]">{label}</p>
        <p className="mt-1 text-base leading-relaxed text-[#1A1A2E]/74">
          {text}
        </p>
      </div>
    </div>
  );
}

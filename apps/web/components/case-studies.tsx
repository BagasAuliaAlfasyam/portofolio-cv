import { CheckCircle2, FileText, Target } from "lucide-react";
import { type ReactNode } from "react";
import { type Messages } from "@/lib/i18n";
import { ScrollParallax } from "./scroll-parallax";

type CaseStudiesProps = {
  messages: Messages;
};

export function CaseStudies({ messages }: CaseStudiesProps) {
  return (
    <section
      className="section-padding overflow-hidden bg-[#FAF8F5]"
      id="projects"
    >
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl text-center"
          maxOffset={38}
        >
          <div>
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.caseStudies.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1B3A5C] md:text-5xl">
              {messages.caseStudies.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A2E]/72">
              {messages.caseStudies.description}
            </p>
          </div>
        </ScrollParallax>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {messages.caseStudies.items.map((item) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"
              key={`${item.project}-${item.client}`}
            >
              <p className="text-base font-bold uppercase tracking-[0.14em] text-[#E8531A]">
                {item.context}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C]">
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

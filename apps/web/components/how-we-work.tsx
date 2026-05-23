import { type Messages } from "@/lib/i18n";
import { ScrollParallax } from "./scroll-parallax";

type HowWeWorkProps = {
  messages: Messages;
};

export function HowWeWork({ messages }: HowWeWorkProps) {
  return (
    <section
      className="section-padding overflow-hidden bg-white"
      id="process"
    >
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl text-center"
          maxOffset={38}
        >
          <div>
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.howWeWork.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1B3A5C] md:text-5xl">
              {messages.howWeWork.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A2E]/72">
              {messages.howWeWork.description}
            </p>
          </div>
        </ScrollParallax>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden border-t-2 border-dotted border-[#E8531A]/35 lg:block" />
          {messages.howWeWork.steps.map((step, index) => (
            <article className="relative text-center" key={step.title}>
              <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E8531A] text-2xl font-bold tracking-tight text-white shadow-lg">
                {index + 1}
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#1B3A5C]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#1A1A2E]/72">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type TrustBarProps = {
  messages: Messages;
};

export function TrustBar({ messages }: TrustBarProps) {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] py-10 sm:py-12">
      <div className="section-container grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {messages.trustBar.items.map((item, index) => (
          <ScrollParallax
            className="text-center"
            direction="up"
            key={item.label}
            maxOffset={30}
          >
            <Reveal
              delay={index * 90}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <p className="text-3xl font-bold tracking-tight text-[#1B3A5C] sm:text-4xl md:text-5xl">
                {item.value}
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-[#1A1A2E]/74">
                {item.label}
              </p>
            </Reveal>
          </ScrollParallax>
        ))}
      </div>
    </section>
  );
}

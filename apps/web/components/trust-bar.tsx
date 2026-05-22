import { type Messages } from "@/lib/i18n";
import { ScrollParallax } from "./scroll-parallax";

type TrustBarProps = {
  messages: Messages;
};

export function TrustBar({ messages }: TrustBarProps) {
  return (
    <section className="overflow-hidden bg-[#F5F5F5] py-12">
      <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {messages.trustBar.items.map((item) => (
          <ScrollParallax
            className="text-center"
            direction="up"
            key={item.label}
            maxOffset={30}
          >
            <div>
              <p className="text-4xl font-bold tracking-tight text-[#1B3A5C] md:text-5xl">
                {item.value}
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-[#1A1A2E]/74">
                {item.label}
              </p>
            </div>
          </ScrollParallax>
        ))}
      </div>
    </section>
  );
}

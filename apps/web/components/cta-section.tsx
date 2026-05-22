import { ArrowRight } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ParallaxLayer } from "./parallax-layer";
import { ScrollParallax } from "./scroll-parallax";

type CtaSectionProps = {
  messages: Messages;
};

export function CtaSection({ messages }: CtaSectionProps) {
  const whatsappHref = `https://wa.me/6285121379282?text=${encodeURIComponent(
    messages.whatsapp.message,
  )}`;

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-r from-[#E8531A] via-[#C9471A] to-[#1B3A5C] py-20 text-white"
      id="contact"
    >
      <ParallaxLayer
        className="-inset-y-20 opacity-25 subtle-diagonal-pattern"
        maxOffset={48}
        speed={-0.08}
      />
      <div className="section-container relative text-center">
        <ScrollParallax maxOffset={38}>
          <div>
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
              {messages.cta.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/88">
              {messages.cta.subtext}
            </p>
            <a
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-[#1B3A5C] shadow-lg transition hover:bg-[#FAF8F5]"
              href={whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              {messages.cta.button}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </ScrollParallax>
      </div>
    </section>
  );
}

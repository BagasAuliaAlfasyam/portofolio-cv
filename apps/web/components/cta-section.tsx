import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type CtaSectionProps = {
  messages: Messages;
};

export function CtaSection({ messages }: CtaSectionProps) {
  const whatsappHref = `https://wa.me/6285121379282?text=${encodeURIComponent(
    messages.whatsapp.message,
  )}`;

  return (
    <section className="overflow-hidden bg-white py-14 text-[#1A1A2E] sm:py-16 md:py-24 lg:py-28">
      <div className="section-container">
        <div
          className="grid scroll-mt-40 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12"
          id="contact"
        >
          <ScrollParallax maxOffset={38}>
            <Reveal direction="left">
              <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
                {messages.navbar.contact}
              </p>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
                {messages.cta.headline}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#1A1A2E]/72 sm:mt-6 sm:text-lg">
                {messages.cta.subtext}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E8531A] px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-[#F4784A] sm:w-auto sm:px-7 sm:py-4"
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle className="h-5 w-5" />
                  {messages.cta.button}
                </a>
                <a
                  className="inline-flex w-full min-w-0 items-center justify-center gap-3 break-all rounded-full border border-[#1B3A5C]/20 px-6 py-3.5 text-center text-base font-bold text-[#1B3A5C] transition hover:border-[#E8531A] hover:text-[#E8531A] sm:w-auto sm:px-7 sm:py-4"
                  href={`mailto:${messages.footer.contactEmail}`}
                >
                  <Mail className="h-5 w-5" />
                  {messages.footer.contactEmail}
                </a>
              </div>
            </Reveal>
          </ScrollParallax>

          <Reveal className="min-w-0" direction="right">
            <div className="rounded-lg border border-slate-200 bg-[#FAF8F5] p-4 shadow-sm sm:p-6 md:p-8">
              <ContactForm messages={messages} />
              <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6">
                {[
                  {
                    href: `tel:${messages.footer.contactPhone.replaceAll(" ", "")}`,
                    icon: Phone,
                    label: messages.cta.phoneLabel,
                    value: messages.footer.contactPhone,
                  },
                  {
                    icon: MapPin,
                    label: messages.cta.addressLabel,
                    value: messages.footer.contactAddress,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <Icon className="h-5 w-5 shrink-0 text-[#E8531A]" />
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#1B3A5C]/52">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words text-base font-bold text-[#1B3A5C]">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  if (item.href) {
                    return (
                      <Reveal
                        delay={index * 80}
                        direction="right"
                        key={item.label}
                      >
                        <a
                          className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 transition hover:shadow-md"
                          href={item.href}
                        >
                          {content}
                          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#E8531A]" />
                        </a>
                      </Reveal>
                    );
                  }

                  return (
                    <Reveal
                      delay={index * 80}
                      direction="right"
                      key={item.label}
                    >
                      <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3">
                        {content}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { LanguageSwitcher } from "@repo/ui/language-switcher";
import { Mail, MapPin, Phone } from "lucide-react";
import { type Locale, type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type FooterProps = {
  messages: Messages;
  locale: Locale;
};

export function Footer({ messages, locale }: FooterProps) {
  const navItems = [
    { href: "#about", label: messages.navbar.about },
    { href: "#products", label: messages.navbar.products },
    { href: "#process", label: messages.navbar.howWeWork },
    { href: "#projects", label: messages.navbar.testimonials },
    { href: "#contact", label: messages.navbar.contact },
  ];

  return (
    <footer className="overflow-hidden bg-[#1B3A5C] text-white">
      <div className="section-container grid gap-10 py-12 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
        <ScrollParallax direction="up" maxOffset={30}>
          <Reveal direction="left">
          <div className="flex items-center gap-4">
            <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image
                alt={messages.brand.logoAlt}
                className="object-cover"
                fill
                sizes="56px"
                src="/logo_icon_only.png"
              />
            </span>
            <div>
              <p className="text-2xl font-bold tracking-tight">
                {messages.brand.name}
              </p>
              <p className="mt-1 text-base font-semibold uppercase tracking-[0.14em] text-white/62">
                {messages.brand.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/74">
            {messages.metadata.description}
          </p>
          </Reveal>
        </ScrollParallax>

        <ScrollParallax direction="up" maxOffset={34}>
          <Reveal delay={100} direction="up">
          <nav className="grid content-start gap-4">
            {navItems.map((item) => (
              <a
                className="text-base font-semibold text-white/78 transition hover:text-[#F4784A]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          </Reveal>
        </ScrollParallax>

        <ScrollParallax direction="up" maxOffset={38}>
          <Reveal delay={160} direction="right">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {messages.footer.contactTitle}
            </h2>
            <div className="mt-5 grid gap-3 text-base leading-relaxed text-white/78">
              <a
                className="flex items-center gap-3 transition hover:text-[#F4784A]"
                href={`mailto:${messages.footer.contactEmail}`}
              >
                <Mail className="h-5 w-5" />
                {messages.footer.contactEmail}
              </a>
              <a
                className="flex items-center gap-3 transition hover:text-[#F4784A]"
                href={`tel:${messages.footer.contactPhone.replaceAll(" ", "")}`}
              >
                <Phone className="h-5 w-5" />
                {messages.footer.contactPhone}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                {messages.footer.contactAddress}
              </p>
            </div>
            <LanguageSwitcher
              ariaLabel={messages.language.label}
              className="mt-6"
              currentLocale={locale}
              locales={[
                { code: "id", href: "/", label: messages.language.id },
                { code: "en", href: "/en", label: messages.language.en },
              ]}
            />
          </div>
          </Reveal>
        </ScrollParallax>
      </div>
      <div className="border-t border-white/12 py-5">
        <div className="section-container">
          <p className="text-base leading-relaxed text-white/68">
            {messages.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

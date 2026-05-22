import Image from "next/image";
import { LanguageSwitcher } from "@repo/ui/language-switcher";
import { Mail, MapPin, Phone } from "lucide-react";
import { type Locale, type Messages } from "@/lib/i18n";
import { ScrollParallax } from "./scroll-parallax";

type FooterProps = {
  messages: Messages;
  locale: Locale;
};

export function Footer({ messages, locale }: FooterProps) {
  const navItems = [
    { href: "#products", label: messages.navbar.products },
    { href: "#how-we-work", label: messages.navbar.howWeWork },
    { href: "#testimonials", label: messages.navbar.testimonials },
    { href: "#contact", label: messages.navbar.contact },
  ];

  return (
    <footer className="overflow-hidden bg-[#1B3A5C] text-white">
      <div className="section-container grid gap-10 py-14 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
        <ScrollParallax direction="up" maxOffset={30}>
          <div className="inline-flex overflow-hidden rounded-xl bg-white shadow-sm">
            <Image
              alt={messages.brand.logoAlt}
              className="h-56 w-56 object-cover sm:h-64 sm:w-64"
              height={320}
              src="/logoBackground.png"
              width={320}
            />
          </div>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/74">
            {messages.brand.tagline}
          </p>
        </ScrollParallax>

        <ScrollParallax direction="up" maxOffset={34}>
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
        </ScrollParallax>

        <ScrollParallax direction="up" maxOffset={38}>
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

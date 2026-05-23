import Image from "next/image";
import { LanguageSwitcher } from "@repo/ui/language-switcher";
import { type Locale, type Messages } from "@/lib/i18n";
import { MobileMenu } from "./mobile-menu";

type NavbarProps = {
  messages: Messages;
  locale: Locale;
};

export function Navbar({ messages, locale }: NavbarProps) {
  const prefix = locale === "en" ? "/en" : "";
  const navItems = [
    { href: "#about", label: messages.navbar.about },
    { href: "#products", label: messages.navbar.products },
    { href: "#process", label: messages.navbar.howWeWork },
    { href: "#projects", label: messages.navbar.testimonials },
    { href: "#contact", label: messages.navbar.contact },
  ];

  return (
    <header className="relative sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="section-container flex min-h-20 items-center justify-between gap-5">
        <a className="flex shrink-0 items-center gap-3" href={prefix || "/"}>
          <span className="relative block h-12 w-12 overflow-hidden rounded-md">
            <Image
              alt={messages.brand.logoAlt}
              className="object-cover"
              fill
              priority
              sizes="48px"
              src="/logo_icon_only.png"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-2xl font-bold tracking-tight text-[#1B3A5C]">
              {messages.brand.name}
            </span>
            <span className="hidden text-base font-semibold uppercase tracking-[0.18em] text-[#1A1A2E]/70 sm:block">
              {messages.brand.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-base font-semibold text-[#1A1A2E] transition-colors hover:text-[#E8531A]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher
            ariaLabel={messages.language.label}
            currentLocale={locale}
            locales={[
              { code: "id", href: "/", label: messages.language.id },
              { code: "en", href: "/en", label: messages.language.en },
            ]}
          />
          <a
            className="hidden rounded-full bg-[#E8531A] px-5 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#F4784A] md:inline-flex"
            href="#contact"
          >
            {messages.navbar.cta}
          </a>
          <MobileMenu ctaLabel={messages.navbar.cta} items={navItems} />
        </div>
      </div>
    </header>
  );
}

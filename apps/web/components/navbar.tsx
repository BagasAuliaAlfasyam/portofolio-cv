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
      <div className="section-container flex min-h-14 items-center justify-between gap-2 px-3 sm:min-h-20 sm:gap-5 sm:px-6 lg:px-8">
        <a
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          href={prefix || "/"}
        >
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-md sm:h-12 sm:w-12">
            <Image
              alt={messages.brand.logoAlt}
              className="object-cover"
              fill
              priority
              sizes="48px"
              src="/logo_icon_only.png"
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[1.05rem] font-bold tracking-tight text-[#1B3A5C] min-[390px]:text-lg sm:text-2xl">
              {messages.brand.name}
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-[#1A1A2E]/70 xl:block">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LanguageSwitcher
            ariaLabel={messages.language.label}
            className="shrink-0 p-0.5 [&_a]:px-2 [&_a]:py-1.5 [&_a]:text-xs sm:p-1 sm:[&_a]:px-3 sm:[&_a]:text-sm"
            currentLocale={locale}
            locales={[
              { code: "id", href: "/", label: messages.language.id },
              { code: "en", href: "/en", label: messages.language.en },
            ]}
          />
          <a
            className="hidden rounded-full bg-[#E8531A] px-5 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#F4784A] xl:inline-flex"
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

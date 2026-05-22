import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CaseStudies } from "@/components/case-studies";
import { CtaSection } from "@/components/cta-section";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowWeWork } from "@/components/how-we-work";
import { Navbar } from "@/components/navbar";
import { Products } from "@/components/products";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseUs } from "@/components/why-choose-us";
import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  LOCALES,
  type Locale,
} from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map(
    (locale) => ({
      locale,
    }),
  );
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const messages = getMessages(localeParam);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  if (localeParam === DEFAULT_LOCALE) {
    redirect("/");
  }

  return <MarketingPage locale={localeParam} />;
}

function MarketingPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A2E]">
      <Navbar messages={messages} locale={locale} />
      <Hero messages={messages} />
      <TrustBar messages={messages} />
      <Products messages={messages} />
      <WhyChooseUs messages={messages} />
      <HowWeWork messages={messages} />
      <CaseStudies messages={messages} />
      <CtaSection messages={messages} />
      <Footer messages={messages} locale={locale} />
      <FloatingWhatsapp messages={messages} />
    </main>
  );
}

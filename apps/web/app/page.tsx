import type { Metadata } from "next";
import { AboutCompany } from "@/components/about-company";
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
import { DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

const messages = getMessages(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: messages.metadata.title,
  description: messages.metadata.description,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A2E]">
      <Navbar messages={messages} locale={DEFAULT_LOCALE} />
      <Hero messages={messages} />
      <TrustBar messages={messages} />
      <AboutCompany messages={messages} />
      <Products messages={messages} />
      <WhyChooseUs messages={messages} />
      <HowWeWork messages={messages} />
      <CaseStudies messages={messages} />
      <CtaSection messages={messages} />
      <Footer messages={messages} locale={DEFAULT_LOCALE} />
      <FloatingWhatsapp messages={messages} />
    </main>
  );
}

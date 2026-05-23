import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { type Locale, type Messages } from "@/lib/i18n";

type SectionPageProps = {
  children: React.ReactNode;
  eyebrow: string;
  locale: Locale;
  messages: Messages;
  title: string;
};

export function SectionPage({
  children,
  eyebrow,
  locale,
  messages,
  title,
}: SectionPageProps) {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A2E]">
      <Navbar locale={locale} messages={messages} />
      <section className="section-container py-20">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E8531A]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-[#1B3A5C]">
          {title}
        </h1>
        <div className="mt-10">{children}</div>
      </section>
      <Footer locale={locale} messages={messages} />
    </main>
  );
}

import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const messages = getMessages(locale);

  return (
    <SectionPage
      eyebrow={messages.navbar.contact}
      locale={locale}
      messages={messages}
      title={messages.cta.headline}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Email", messages.footer.contactEmail],
          ["Phone", messages.footer.contactPhone],
          ["Address", messages.footer.contactAddress],
        ].map(([label, value]) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            key={label}
          >
            <h2 className="text-lg font-bold text-[#1B3A5C]">{label}</h2>
            <p className="mt-3 text-base text-slate-600">{value}</p>
          </article>
        ))}
      </div>
    </SectionPage>
  );
}

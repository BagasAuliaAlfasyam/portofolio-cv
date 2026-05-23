import { SectionPage } from "@/components/section-page";
import { DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

export default function ContactPage() {
  const messages = getMessages(DEFAULT_LOCALE);

  return (
    <SectionPage
      eyebrow="Kontak"
      locale={DEFAULT_LOCALE}
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

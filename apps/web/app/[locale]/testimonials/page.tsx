import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export default async function TestimonialsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const messages = getMessages(locale);

  return (
    <SectionPage
      eyebrow={messages.testimonials.eyebrow}
      locale={locale}
      messages={messages}
      title={messages.testimonials.title}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {messages.testimonials.items.map((item) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            key={item.name}
          >
            <p className="text-base leading-relaxed text-slate-700">
              &quot;{item.quote}&quot;
            </p>
            <h2 className="mt-6 text-xl font-bold text-[#1B3A5C]">
              {item.name}
            </h2>
            <p className="text-base text-slate-500">
              {item.title} - {item.company}
            </p>
          </article>
        ))}
      </div>
    </SectionPage>
  );
}

import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const messages = getMessages(locale);

  return (
    <SectionPage
      eyebrow={messages.products.eyebrow}
      locale={locale}
      messages={messages}
      title={messages.products.title}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {messages.products.items.map((item) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            key={item.name}
          >
            <h2 className="text-2xl font-bold text-[#1B3A5C]">{item.name}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionPage>
  );
}

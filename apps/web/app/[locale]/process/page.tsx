import { notFound } from "next/navigation";
import { SectionPage } from "@/components/section-page";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ProcessPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const messages = getMessages(locale);

  return (
    <SectionPage
      eyebrow={messages.howWeWork.eyebrow}
      locale={locale}
      messages={messages}
      title={messages.howWeWork.title}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {messages.howWeWork.steps.map((step, index) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            key={step.title}
          >
            <p className="text-3xl font-bold text-[#E8531A]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-5 text-xl font-bold text-[#1B3A5C]">
              {step.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionPage>
  );
}

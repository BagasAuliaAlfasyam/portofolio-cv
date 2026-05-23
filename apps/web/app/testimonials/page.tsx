import { SectionPage } from "@/components/section-page";
import { DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

export default function TestimonialsPage() {
  const messages = getMessages(DEFAULT_LOCALE);

  return (
    <SectionPage
      eyebrow="Testimoni"
      locale={DEFAULT_LOCALE}
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

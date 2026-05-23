import { SectionPage } from "@/components/section-page";
import { DEFAULT_LOCALE, getMessages } from "@/lib/i18n";

export default function ProductsPage() {
  const messages = getMessages(DEFAULT_LOCALE);

  return (
    <SectionPage
      eyebrow="Produk"
      locale={DEFAULT_LOCALE}
      messages={messages}
      title="Solusi digital untuk kebutuhan bisnis Anda"
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

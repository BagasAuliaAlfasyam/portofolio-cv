import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { type ServicePage } from "@/lib/service-pages";
import { DEFAULT_LOCALE, type Messages } from "@/lib/i18n";
import { ConversionLink } from "./conversion-link";
import { CtaSection } from "./cta-section";
import { FloatingWhatsapp } from "./floating-whatsapp";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Reveal } from "./reveal";

type ServiceLandingPageProps = {
  messages: Messages;
  page: ServicePage;
};

const siteUrl = "https://catalystforge.web.id";

export function ServiceLandingPage({
  messages,
  page,
}: ServiceLandingPageProps) {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    areaServed: "Indonesia",
    description: page.description,
    name: page.metaTitle,
    provider: {
      "@type": "Organization",
      name: "CatalystForge",
      url: siteUrl,
    },
    serviceType: page.eyebrow,
    url: `${siteUrl}/${page.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1A1A2E]">
      <Navbar messages={messages} locale={DEFAULT_LOCALE} />

      <section className="relative isolate overflow-hidden bg-[#163453] text-white">
        <Image
          alt=""
          className="object-cover opacity-[0.18]"
          fill
          priority
          sizes="100vw"
          src="/logoBackground.png"
        />
        <div className="absolute inset-0 bg-[#163453]/88" />
        <div className="section-container relative z-10 flex min-h-[78svh] items-center py-14 sm:py-16 md:py-20">
          <Reveal className="max-w-4xl" direction="up">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFB79C] sm:text-base">
              {page.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {page.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 sm:text-xl">
              {page.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E8531A] px-6 py-3 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#F4784A] sm:px-7"
                href="#contact"
              >
                {page.primaryCta}
                <ArrowRight className="h-5 w-5" />
              </a>
              <ConversionLink
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/20 sm:px-7"
                eventLabel={`service_demo_${page.slug}`}
                eventName="demo_click"
                href={page.demoHref}
                rel="noreferrer"
                target="_blank"
              >
                {page.secondaryCta}
                <ExternalLink className="h-5 w-5" />
              </ConversionLink>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Estimasi", value: page.timeline },
                { label: "Cocok untuk", value: page.bestFor },
                { label: "Output", value: page.deliverables[0] },
              ].map((item) => (
                <div
                  className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
                  key={item.label}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFB79C]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white/86">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="section-padding scroll-mt-40 overflow-hidden bg-white"
        id="about"
      >
        <div className="section-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="left">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              Rumusan Masalah
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              Kenapa bisnis biasanya mulai butuh solusi ini?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:text-lg">
              Halaman ini dibuat untuk prospek yang sudah punya masalah
              operasional atau kredibilitas digital yang jelas, lalu butuh
              partner untuk memetakan scope dan delivery.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {page.problems.map((problem, index) => (
              <Reveal delay={index * 90} direction="right" key={problem}>
                <div className="flex gap-4 rounded-lg border border-slate-200 bg-[#FAF8F5] p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF4EF] text-[#E8531A]">
                    <Target className="h-5 w-5" />
                  </span>
                  <p className="text-base font-semibold leading-relaxed text-[#1A1A2E]/78">
                    {problem}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding scroll-mt-40 overflow-hidden bg-[#FAF8F5]"
        id="products"
      >
        <div className="section-container">
          <Reveal className="max-w-3xl" direction="up">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              Output Solusi
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              Yang bisnis Anda dapatkan
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:text-lg">
              Fokusnya bukan sekadar tampilan, tapi aset digital yang bisa
              dipakai untuk penjualan, operasional, dan pengambilan keputusan.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal direction="left">
              <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF4EF] text-[#E8531A]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-[#1B3A5C]">
                    Outcome bisnis
                  </h3>
                </div>
                <div className="mt-6 grid gap-4">
                  {page.outcomes.map((outcome) => (
                    <Point key={outcome} text={outcome} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF4EF] text-[#E8531A]">
                    <FileCheck2 className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-[#1B3A5C]">
                    Deliverables
                  </h3>
                </div>
                <div className="mt-6 grid gap-4">
                  {page.deliverables.map((deliverable) => (
                    <Point key={deliverable} text={deliverable} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="section-padding scroll-mt-40 overflow-hidden bg-white"
        id="process"
      >
        <div className="section-container">
          <Reveal className="max-w-3xl" direction="up">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              Cara Eksekusi
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              Dari masalah sampai siap dipakai
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.workflow.map((step, index) => (
              <Reveal delay={index * 100} direction="up" key={step.label}>
                <div className="h-full rounded-lg border border-slate-200 bg-[#FAF8F5] p-5 shadow-sm sm:p-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1B3A5C]/12 bg-white px-3 py-1.5 text-xs font-bold text-[#1B3A5C]">
                    <Clock3 className="h-4 w-4 text-[#E8531A]" />
                    Step {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#1B3A5C]">
                    {step.label}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#1A1A2E]/72">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding scroll-mt-40 overflow-hidden bg-[#1B3A5C] text-white"
        id="projects"
      >
        <div className="section-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="left">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#FFB79C]">
              Bukti dan Kesesuaian
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              Relevan untuk kebutuhan nyata
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/74 sm:text-lg">
              Kami memulai dari proses bisnis dan konteks pengguna, lalu
              menerjemahkannya menjadi aplikasi atau website yang mudah
              dijelaskan ke stakeholder.
            </p>
          </Reveal>

          <Reveal direction="right">
            <article className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur sm:p-7">
              <div className="flex items-center gap-3 text-[#FFB79C]">
                <ShieldCheck className="h-6 w-6" />
                <p className="text-sm font-bold uppercase tracking-[0.16em]">
                  {page.caseStudy.context}
                </p>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">
                {page.caseStudy.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/78">
                {page.caseStudy.summary}
              </p>
              <div className="mt-6 rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#FFB79C]">
                  Dampak yang dituju
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-white/86">
                  {page.caseStudy.impact}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-padding overflow-hidden bg-white">
        <div className="section-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal direction="left">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              FAQ
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              Pertanyaan awal yang sering muncul
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {page.faq.map((item, index) => (
              <Reveal delay={index * 90} direction="right" key={item.question}>
                <div className="rounded-lg border border-slate-200 bg-[#FAF8F5] p-5">
                  <h3 className="text-lg font-bold text-[#1B3A5C]">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#1A1A2E]/72">
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection messages={messages} />
      <Footer messages={messages} locale={DEFAULT_LOCALE} />
      <FloatingWhatsapp messages={messages} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
    </main>
  );
}

function Point({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8531A]" />
      <p className="text-base font-semibold leading-relaxed text-[#1A1A2E]/76">
        {text}
      </p>
    </div>
  );
}

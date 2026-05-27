import {
  ArrowRight,
  Bot,
  Building,
  MonitorSmartphone,
  ShoppingCart,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { ScrollParallax } from "./scroll-parallax";

type ProductsProps = {
  messages: Messages;
};

const productIcons: LucideIcon[] = [
  Bot,
  UsersRound,
  Building,
  ShoppingCart,
  MonitorSmartphone,
];

export function Products({ messages }: ProductsProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl scroll-mt-40 text-center"
          id="products"
          maxOffset={38}
        >
          <Reveal direction="up">
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.products.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1B3A5C] sm:text-3xl md:text-5xl">
              {messages.products.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1A1A2E]/72 sm:mt-6 sm:text-lg">
              {messages.products.description}
            </p>
          </Reveal>
        </ScrollParallax>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {messages.products.items.map((product, index) => {
            const Icon = productIcons[index] ?? MonitorSmartphone;

            return (
              <Reveal
                className="h-full"
                delay={index * 100}
                direction={index % 2 === 0 ? "left" : "right"}
                key={product.name}
              >
                <article className="product-card-motion group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#E8531A]/30 hover:shadow-xl sm:p-7">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#E8531A] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#FFF4EF]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative mt-6 text-2xl font-bold tracking-tight text-[#1B3A5C]">
                    {product.name}
                  </h3>
                  <p className="relative mt-4 text-base leading-relaxed text-[#1A1A2E]/72 md:min-h-24">
                    {product.description}
                  </p>
                  <a
                    className="relative mt-6 inline-flex items-center gap-2 text-base font-bold text-[#E8531A] transition group-hover:text-[#1B3A5C] md:mt-auto md:pt-6"
                    href={product.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {product.cta ?? messages.products.learnMore}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

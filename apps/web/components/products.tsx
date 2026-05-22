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
    <section className="section-padding overflow-hidden bg-white" id="products">
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl text-center"
          maxOffset={38}
        >
          <div>
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.products.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1B3A5C] md:text-5xl">
              {messages.products.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A2E]/72">
              {messages.products.description}
            </p>
          </div>
        </ScrollParallax>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.products.items.map((product, index) => {
            const Icon = productIcons[index] ?? MonitorSmartphone;

            return (
              <article
                className="group rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                key={product.name}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#E8531A]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#1B3A5C]">
                  {product.name}
                </h3>
                <p className="mt-4 min-h-24 text-base leading-relaxed text-[#1A1A2E]/72">
                  {product.description}
                </p>
                <a
                  className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#E8531A] transition group-hover:text-[#1B3A5C]"
                  href={product.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {product.cta ?? messages.products.learnMore}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  Headphones,
  Layers3,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ParallaxLayer } from "./parallax-layer";
import { ScrollParallax } from "./scroll-parallax";

type WhyChooseUsProps = {
  messages: Messages;
};

const valueIcons: LucideIcon[] = [Layers3, Users, Headphones, ShieldCheck];

export function WhyChooseUs({ messages }: WhyChooseUsProps) {
  return (
    <section className="section-padding relative isolate overflow-hidden bg-[#1B3A5C] text-white">
      <ParallaxLayer
        className="-inset-y-16 opacity-30 subtle-diagonal-pattern"
        maxOffset={44}
        speed={0.05}
      />
      <div className="section-container relative">
        <ScrollParallax className="max-w-3xl" maxOffset={38}>
          <div>
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#F4784A]">
              {messages.whyChooseUs.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              {messages.whyChooseUs.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/78">
              {messages.whyChooseUs.description}
            </p>
          </div>
        </ScrollParallax>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {messages.whyChooseUs.items.map((item, index) => {
            const Icon = valueIcons[index] ?? ShieldCheck;

            return (
              <article
                className="rounded-lg border border-white/12 bg-white/[0.08] p-7"
                key={item.heading}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#E8531A]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  {item.heading}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/76">
                  {item.paragraph}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Star } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ScrollParallax } from "./scroll-parallax";

type TestimonialsProps = {
  messages: Messages;
};

export function Testimonials({ messages }: TestimonialsProps) {
  return (
    <section
      className="section-padding overflow-hidden bg-[#FAF8F5]"
      id="testimonials"
    >
      <div className="section-container">
        <ScrollParallax
          className="mx-auto max-w-3xl text-center"
          maxOffset={38}
        >
          <div>
            <p className="text-base font-bold uppercase tracking-[0.16em] text-[#E8531A]">
              {messages.testimonials.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1B3A5C] md:text-5xl">
              {messages.testimonials.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#1A1A2E]/72">
              {messages.testimonials.description}
            </p>
          </div>
        </ScrollParallax>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {messages.testimonials.items.map((item) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm"
              key={`${item.name}-${item.company}`}
            >
              <div
                aria-label={messages.testimonials.ratingLabel}
                className="flex gap-1 text-[#E8531A]"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    className="h-5 w-5 fill-current"
                    key={index}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[#1A1A2E]/80">
                {item.quote}
              </p>
              <div className="mt-7 flex items-center gap-4 border-t border-slate-200 pt-6">
                <Image
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                  height={56}
                  src={item.avatar}
                  width={56}
                />
                <div>
                  <p className="text-lg font-bold tracking-tight text-[#1B3A5C]">
                    {item.name}
                  </p>
                  <p className="text-base leading-relaxed text-[#1A1A2E]/68">
                    {item.title}
                  </p>
                  <p className="text-base font-semibold leading-relaxed text-[#1A1A2E]/78">
                    {item.company}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

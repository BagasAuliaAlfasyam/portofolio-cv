"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type MobileMenuProps = {
  ctaLabel: string;
  items: Array<{
    href: string;
    label: string;
  }>;
};

export function MobileMenu({ ctaLabel, items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-[#1B3A5C]"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div className="absolute left-5 right-5 top-[calc(100%+8px)] rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <nav className="grid gap-2">
            {items.map((item) => (
              <a
                className="rounded-md px-4 py-3 text-base font-semibold text-[#1A1A2E] hover:bg-[#FAF8F5] hover:text-[#E8531A]"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mt-2 rounded-full bg-[#E8531A] px-4 py-3 text-center text-base font-bold text-white"
              href="#contact"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

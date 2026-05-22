"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LanguageSwitcherLocale = {
  code: string;
  label: string;
  href: string;
};

export interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  currentLocale: string;
  locales: LanguageSwitcherLocale[];
  ariaLabel: string;
  cookieName?: string;
}

export function LanguageSwitcher({
  currentLocale,
  locales,
  ariaLabel,
  cookieName = "NEXT_LOCALE",
  className,
  ...props
}: LanguageSwitcherProps) {
  function persistLocale(locale: string) {
    document.cookie = `${cookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm",
        className,
      )}
      role="group"
      {...props}
    >
      {locales.map((locale) => {
        const isActive = locale.code === currentLocale;

        return (
          <a
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-bold leading-none transition-colors",
              isActive
                ? "bg-[#1B3A5C] text-white"
                : "text-[#1A1A2E] hover:bg-[#FAF8F5]",
            )}
            href={locale.href}
            key={locale.code}
            onClick={() => persistLocale(locale.code)}
          >
            {locale.label}
          </a>
        );
      })}
    </div>
  );
}

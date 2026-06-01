"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type ConversionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventLabel: string;
  eventName: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function ConversionLink({
  children,
  eventLabel,
  eventName,
  onClick,
  ...props
}: ConversionLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        window.dataLayer?.push({
          event: eventName,
          label: eventLabel,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

"use client";

import { ArrowRight, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "./lib/utils";

type DemoLeadBarProps = {
  appName: string;
  className?: string;
  message?: string;
  title?: string;
  whatsappMessage?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const whatsappNumber = "6285121379282";

export function DemoLeadBar({
  appName,
  className,
  message,
  title = "Mau versi custom untuk bisnis Anda?",
  whatsappMessage,
}: DemoLeadBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const leadMessage =
    whatsappMessage ??
    `Halo CatalystForge, saya tertarik membuat versi custom ${appName} untuk bisnis saya.`;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    leadMessage,
  )}`;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-5xl rounded-lg border border-white/12 bg-[#020617]/95 p-3 text-white shadow-2xl backdrop-blur md:bottom-5 md:p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-black text-white md:text-base">{title}</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-300 md:text-sm">
            {message ??
              `${appName} demo ini bisa disesuaikan dengan data, role, approval, dan workflow operasional Anda.`}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#E8531A] px-4 text-sm font-black text-white transition hover:bg-[#F4784A] md:flex-none"
            href={href}
            onClick={() => {
              window.dataLayer?.push({
                app: appName,
                event: "demo_lead_click",
                label: "sticky_demo_bar",
              });
            }}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            aria-label="Tutup CTA demo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/12 text-slate-400 transition hover:bg-white/10 hover:text-white"
            onClick={() => setVisible(false)}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { ContactPersonModal } from "@repo/ui/contact-person-modal";

export function PosActionButton({
  children,
  className = "inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-black text-white",
  disabled = false,
  featureName,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  featureName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        disabled={disabled}
        onClick={() => setOpen(true)}
        type="button"
      >
        {children}
      </button>
      <ContactPersonModal
        appName="POS System"
        featureName={featureName}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
}

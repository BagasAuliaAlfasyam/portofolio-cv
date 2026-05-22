"use client";

import { getMessages, DEFAULT_LOCALE } from "@/lib/i18n";

const messages = getMessages(DEFAULT_LOCALE);

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
      <button
        className="rounded-full bg-[#E8531A] px-6 py-3 text-base font-bold text-white"
        type="button"
        onClick={reset}
      >
        {messages.error.retry}
      </button>
    </div>
  );
}

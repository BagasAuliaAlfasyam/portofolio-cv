import { MessageCircle } from "lucide-react";
import { type Messages } from "@/lib/i18n";
import { ConversionLink } from "./conversion-link";

type FloatingWhatsappProps = {
  messages: Messages;
};

const WHATSAPP_NUMBER = "6285121379282";

export function FloatingWhatsapp({ messages }: FloatingWhatsappProps) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messages.whatsapp.message,
  )}`;

  return (
    <ConversionLink
      aria-label={messages.whatsapp.label}
      className="fixed bottom-4 right-4 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-[#E8531A] text-white shadow-xl shadow-[#E8531A]/30 transition hover:-translate-y-1 hover:bg-[#F4784A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 sm:bottom-5 sm:right-5 sm:inline-flex sm:h-14 sm:w-14"
      eventLabel="floating_whatsapp"
      eventName="lead_click"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </ConversionLink>
  );
}

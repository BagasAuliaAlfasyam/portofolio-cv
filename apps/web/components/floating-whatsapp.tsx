import { MessageCircle } from "lucide-react";
import { type Messages } from "@/lib/i18n";

type FloatingWhatsappProps = {
  messages: Messages;
};

const WHATSAPP_NUMBER = "6285121379282";

export function FloatingWhatsapp({ messages }: FloatingWhatsappProps) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messages.whatsapp.message,
  )}`;

  return (
    <a
      aria-label={messages.whatsapp.label}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E8531A] text-white shadow-xl shadow-[#E8531A]/30 transition hover:-translate-y-1 hover:bg-[#F4784A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

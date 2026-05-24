"use client";

import { ExternalLink, Mail, MessageCircle, Phone, X } from "lucide-react";

type ContactPersonModalProps = {
  open: boolean;
  onClose: () => void;
  featureName?: string;
  appName?: string;
};

const contact = {
  email: "catalystforgetechnology@gmail.com",
  phone: "085121379282",
  whatsappUrl: "https://wa.me/6285121379282",
};

export function ContactPersonModal({
  open,
  onClose,
  featureName = "fitur ini",
  appName = "demo app",
}: ContactPersonModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Catalyst Forge
            </p>
            <h2 className="mt-2 text-xl font-bold">Hubungi Kami</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Tutup popup kontak"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <p className="text-sm leading-6 text-slate-300">
            <span className="font-semibold text-white">{featureName}</span> di {appName} ini membutuhkan setup backend, database, role, workflow, dan automation yang sesuai proses bisnis kamu. Hubungi CatalystForge agar kami bantu lanjutkan ke versi siap pakai.
          </p>

          <div className="grid gap-3">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                Chat WhatsApp
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
            >
              <Mail className="h-5 w-5 text-cyan-300" />
              {contact.email}
            </a>
            <a
              href="tel:+6285121379282"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
            >
              <Phone className="h-5 w-5 text-cyan-300" />
              {contact.phone}
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            Lanjut lihat demo
          </button>
        </div>
      </div>
    </div>
  );
}

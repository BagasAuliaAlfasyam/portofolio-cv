"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { type Messages } from "@/lib/i18n";

type ContactFormProps = {
  messages: Messages;
};

export function ContactForm({ messages }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const labels =
    messages.locale === "id"
      ? {
          company: "Perusahaan",
          email: "Email",
          message: "Pesan",
          name: "Nama",
          phone: "Nomor WhatsApp",
          placeholderCompany: "Nama perusahaan",
          placeholderEmail: "nama@perusahaan.com",
          placeholderMessage: "Ceritakan kebutuhan sistem atau website Anda...",
          placeholderName: "Nama lengkap",
          placeholderPhone: "08xxxxxxxxxx",
          send: "Kirim Inquiry",
          sending: "Mengirim...",
          success: "Pesan berhasil dikirim. Tim kami akan menghubungi Anda.",
          error: "Pesan belum terkirim. Coba lagi atau gunakan WhatsApp.",
        }
      : {
          company: "Company",
          email: "Email",
          message: "Message",
          name: "Name",
          phone: "WhatsApp Number",
          placeholderCompany: "Company name",
          placeholderEmail: "name@company.com",
          placeholderMessage: "Tell us about your system or website needs...",
          placeholderName: "Full name",
          placeholderPhone: "+62...",
          send: "Send Inquiry",
          sending: "Sending...",
          success: "Your message has been sent. Our team will contact you.",
          error: "Message not sent. Please try again or use WhatsApp.",
        };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
        /\/$/,
        "",
      );
      const endpoint = apiBaseUrl
        ? `${apiBaseUrl}/api/contact`
        : "/api/contact";
      const response = await fetch(endpoint, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(data?.message || labels.error);
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : labels.error);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={labels.name}
          name="name"
          placeholder={labels.placeholderName}
          required
        />
        <Field
          label={labels.email}
          name="email"
          placeholder={labels.placeholderEmail}
          required
          type="email"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={labels.phone}
          name="phone"
          placeholder={labels.placeholderPhone}
          type="tel"
        />
        <Field
          label={labels.company}
          name="company"
          placeholder={labels.placeholderCompany}
        />
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#1B3A5C]/58">
          {labels.message}
        </span>
        <textarea
          className="min-h-36 resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-base leading-relaxed text-[#1A1A2E] outline-none transition focus:border-[#E8531A] focus:ring-4 focus:ring-[#E8531A]/12"
          maxLength={2000}
          name="message"
          placeholder={labels.placeholderMessage}
          required
        />
      </label>

      <button
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E8531A] px-7 py-3 text-base font-bold text-white shadow-lg transition hover:bg-[#F4784A] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === "sending"}
        type="submit"
      >
        <Send className="h-5 w-5" />
        {status === "sending" ? labels.sending : labels.send}
      </button>

      {status === "success" ? (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-base font-semibold text-emerald-700">
          {labels.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-base font-semibold text-red-700">
          {errorMessage || labels.error}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#1B3A5C]/58">
        {label}
      </span>
      <input
        className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-base text-[#1A1A2E] outline-none transition focus:border-[#E8531A] focus:ring-4 focus:ring-[#E8531A]/12"
        maxLength={120}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

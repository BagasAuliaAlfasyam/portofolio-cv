"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { type Messages } from "@/lib/i18n";

type ContactFormProps = {
  messages: Messages;
};

const contactLinks = {
  email: "mailto:catalystforgetechnology@gmail.com",
  whatsapp: "https://wa.me/6285121379282",
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
          successTitle: "Inquiry terkirim",
          success:
            "Terima kasih. Tim CatalystForge akan menghubungi Anda secepatnya.",
          successNext:
            "Sambil menunggu balasan email, Anda juga bisa lanjutkan percakapan lewat WhatsApp agar kami bisa review kebutuhan lebih cepat.",
          whatsappCta: "Lanjut WhatsApp",
          emailCta: "Kirim email tambahan",
          errorTitle: "Belum bisa dikirim",
          error: "Pesan belum terkirim. Coba lagi atau gunakan WhatsApp.",
          invalidName: "Nama minimal 2 karakter.",
          invalidEmail: "Email belum valid.",
          invalidPhone: "Nomor WhatsApp minimal 8 digit.",
          invalidMessage: "Pesan minimal 10 karakter agar konteksnya jelas.",
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
          successTitle: "Inquiry sent",
          success: "Thank you. CatalystForge team will contact you shortly.",
          successNext:
            "While waiting for our email reply, you can continue on WhatsApp so we can review the requirement faster.",
          whatsappCta: "Continue on WhatsApp",
          emailCta: "Send extra email",
          errorTitle: "Message not sent",
          error: "Message not sent. Please try again or use WhatsApp.",
          invalidName: "Name must be at least 2 characters.",
          invalidEmail: "Email address is invalid.",
          invalidPhone: "WhatsApp number must contain at least 8 digits.",
          invalidMessage:
            "Message must be at least 10 characters for clear context.",
        };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = createContactPayload(formData);
    const validationError = validateContactPayload(payload, labels);

    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

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
        const data = (await response
          .json()
          .catch(() => null)) as ContactErrorResponse | null;
        throw new Error(getContactErrorMessage(data, labels.error));
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : labels.error);
    }
  }

  return (
    <form className="grid min-w-0 gap-4" onSubmit={handleSubmit}>
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
          minLength={8}
          name="phone"
          placeholder={labels.placeholderPhone}
          required
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
          minLength={10}
          name="message"
          placeholder={labels.placeholderMessage}
          required
        />
      </label>

      <button
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#E8531A] px-7 py-3 text-base font-bold text-white shadow-lg transition hover:bg-[#F4784A] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        disabled={status === "sending"}
        type="submit"
      >
        <Send className="h-5 w-5" />
        {status === "sending" ? labels.sending : labels.send}
      </button>

      {status === "success" ? (
        <FormAlert
          emailCta={labels.emailCta}
          message={labels.success}
          nextMessage={labels.successNext}
          title={labels.successTitle}
          tone="success"
          whatsappCta={labels.whatsappCta}
        />
      ) : null}
      {status === "error" ? (
        <FormAlert
          message={errorMessage || labels.error}
          title={labels.errorTitle}
          tone="error"
        />
      ) : null}
    </form>
  );
}

type ContactPayload = {
  company: string;
  email: string;
  message: string;
  name: string;
  phone: string;
  website: string;
};

type ContactErrorResponse = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
};

function createContactPayload(formData: FormData): ContactPayload {
  return {
    company: getFormValue(formData, "company"),
    email: getFormValue(formData, "email"),
    message: getFormValue(formData, "message"),
    name: getFormValue(formData, "name"),
    phone: getFormValue(formData, "phone"),
    website: getFormValue(formData, "website"),
  };
}

function getFormValue(formData: FormData, key: keyof ContactPayload) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateContactPayload(
  payload: ContactPayload,
  labels: ContactValidationLabels,
) {
  if (payload.name.length < 2) {
    return labels.invalidName;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return labels.invalidEmail;
  }

  if (payload.phone.replace(/\D/g, "").length < 8) {
    return labels.invalidPhone;
  }

  if (payload.message.length < 10) {
    return labels.invalidMessage;
  }

  return "";
}

type ContactValidationLabels = {
  invalidEmail: string;
  invalidMessage: string;
  invalidName: string;
  invalidPhone: string;
};

function getContactErrorMessage(
  data: ContactErrorResponse | null,
  fallback: string,
) {
  if (!data) {
    return fallback;
  }

  if (data.message) {
    return data.message;
  }

  if (typeof data.detail === "string") {
    return data.detail;
  }

  const firstDetail = data.detail?.find((item) => item.msg)?.msg;
  return firstDetail || fallback;
}

function FormAlert({
  emailCta,
  message,
  nextMessage,
  title,
  tone,
  whatsappCta,
}: {
  emailCta?: string;
  message: string;
  nextMessage?: string;
  title: string;
  tone: "error" | "success";
  whatsappCta?: string;
}) {
  const isSuccess = tone === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className={[
        "flex items-start gap-3 rounded-xl border px-4 py-4 shadow-sm",
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-red-200 bg-red-50 text-red-900",
      ].join(" ")}
      role={isSuccess ? "status" : "alert"}
    >
      <span
        className={[
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isSuccess ? "bg-emerald-100" : "bg-red-100",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="grid flex-1 gap-1">
        <span className="text-sm font-bold uppercase tracking-[0.12em]">
          {title}
        </span>
        <span className="text-sm font-semibold leading-relaxed">{message}</span>
        {isSuccess && nextMessage ? (
          <>
            <span className="mt-2 text-sm leading-relaxed">{nextMessage}</span>
            <span className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-emerald-700"
                href={contactLinks.whatsapp}
                rel="noopener noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-4 w-4" />
                {whatsappCta}
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-center text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
                href={contactLinks.email}
              >
                <Mail className="h-4 w-4" />
                {emailCta}
              </a>
            </span>
          </>
        ) : null}
      </span>
    </div>
  );
}

function Field({
  label,
  minLength,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  minLength?: number;
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
        className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-4 text-base text-[#1A1A2E] outline-none transition focus:border-[#E8531A] focus:ring-4 focus:ring-[#E8531A]/12"
        maxLength={120}
        minLength={minLength}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

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
import { UTM_STORAGE_KEY, type StoredUtm } from "./utm-capture";

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
          budgetRange: "Estimasi Budget",
          company: "Perusahaan",
          email: "Email",
          message: "Pesan",
          name: "Nama",
          needType: "Kebutuhan Utama",
          phone: "Nomor WhatsApp",
          timeline: "Target Waktu",
          budgetRangeOptions: [
            "Belum ditentukan / butuh arahan",
            "< Rp10 juta",
            "Rp10-25 juta",
            "Rp25-50 juta",
            "Rp50 juta+",
          ],
          needTypeOptions: [
            "Company Profile / Website",
            "Custom CRM",
            "Custom HRIS",
            "Custom POS",
            "AI Support / Chatbot",
            "Dashboard / Sistem Internal",
          ],
          timelineOptions: [
            "Secepatnya",
            "1 bulan",
            "2-3 bulan",
            "3+ bulan",
            "Masih eksplorasi",
          ],
          placeholderCompany: "Nama perusahaan",
          placeholderBudgetRange: "Pilih estimasi budget",
          placeholderEmail: "nama@perusahaan.com",
          placeholderMessage: "Ceritakan kebutuhan sistem atau website Anda...",
          placeholderName: "Nama lengkap",
          placeholderNeedType: "Pilih kebutuhan utama",
          placeholderPhone: "08xxxxxxxxxx",
          placeholderTimeline: "Pilih target waktu",
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
          invalidNeedType: "Pilih kebutuhan utama.",
          invalidBudgetRange: "Pilih estimasi budget.",
          invalidTimeline: "Pilih target waktu.",
        }
      : {
          budgetRange: "Estimated Budget",
          company: "Company",
          email: "Email",
          message: "Message",
          name: "Name",
          needType: "Main Need",
          phone: "WhatsApp Number",
          timeline: "Target Timeline",
          budgetRangeOptions: [
            "Not decided / need guidance",
            "< IDR 10 million",
            "IDR 10-25 million",
            "IDR 25-50 million",
            "IDR 50 million+",
          ],
          needTypeOptions: [
            "Company Profile / Website",
            "Custom CRM",
            "Custom HRIS",
            "Custom POS",
            "AI Support / Chatbot",
            "Dashboard / Internal System",
          ],
          timelineOptions: [
            "As soon as possible",
            "1 month",
            "2-3 months",
            "3+ months",
            "Still exploring",
          ],
          placeholderCompany: "Company name",
          placeholderBudgetRange: "Choose budget estimate",
          placeholderEmail: "name@company.com",
          placeholderMessage: "Tell us about your system or website needs...",
          placeholderName: "Full name",
          placeholderNeedType: "Choose main need",
          placeholderPhone: "+62...",
          placeholderTimeline: "Choose target timeline",
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
          invalidNeedType: "Choose the main need.",
          invalidBudgetRange: "Choose the budget estimate.",
          invalidTimeline: "Choose the target timeline.",
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
      <div className="grid gap-4 lg:grid-cols-3">
        <SelectField
          label={labels.needType}
          name="needType"
          options={labels.needTypeOptions}
          placeholder={labels.placeholderNeedType}
          required
        />
        <SelectField
          label={labels.budgetRange}
          name="budgetRange"
          options={labels.budgetRangeOptions}
          placeholder={labels.placeholderBudgetRange}
          required
        />
        <SelectField
          label={labels.timeline}
          name="timeline"
          options={labels.timelineOptions}
          placeholder={labels.placeholderTimeline}
          required
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
  budgetRange: string;
  company: string;
  email: string;
  message: string;
  name: string;
  needType: string;
  pagePath: string;
  phone: string;
  timeline: string;
  utmCampaign: string;
  utmContent: string;
  utmMedium: string;
  utmSource: string;
  utmTerm: string;
  website: string;
};

type ContactErrorResponse = {
  detail?: string | Array<{ msg?: string }>;
  message?: string;
};

function createContactPayload(formData: FormData): ContactPayload {
  const storedUtm = getStoredUtmPayload();

  return {
    budgetRange: getFormValue(formData, "budgetRange"),
    company: getFormValue(formData, "company"),
    email: getFormValue(formData, "email"),
    message: getFormValue(formData, "message"),
    name: getFormValue(formData, "name"),
    needType: getFormValue(formData, "needType"),
    pagePath: getCurrentPagePath(),
    phone: getFormValue(formData, "phone"),
    timeline: getFormValue(formData, "timeline"),
    utmCampaign: storedUtm.utmCampaign ?? "",
    utmContent: storedUtm.utmContent ?? "",
    utmMedium: storedUtm.utmMedium ?? "",
    utmSource: storedUtm.utmSource ?? "",
    utmTerm: storedUtm.utmTerm ?? "",
    website: getFormValue(formData, "website"),
  };
}

type ContactFormField =
  | "budgetRange"
  | "company"
  | "email"
  | "message"
  | "name"
  | "needType"
  | "phone"
  | "timeline"
  | "website";

function getFormValue(formData: FormData, key: ContactFormField) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getCurrentPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.pathname}${window.location.search}`.slice(0, 240);
}

function getStoredUtmPayload(): StoredUtm {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(UTM_STORAGE_KEY);

    if (!value) {
      return {};
    }

    const parsed: unknown = JSON.parse(value);

    if (!isRecord(parsed)) {
      return {};
    }

    return {
      utmCampaign: getStoredString(parsed, "utmCampaign"),
      utmContent: getStoredString(parsed, "utmContent"),
      utmMedium: getStoredString(parsed, "utmMedium"),
      utmSource: getStoredString(parsed, "utmSource"),
      utmTerm: getStoredString(parsed, "utmTerm"),
    };
  } catch {
    return {};
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getStoredString(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return typeof value === "string" ? value.slice(0, 120) : "";
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

  if (!payload.needType) {
    return labels.invalidNeedType;
  }

  if (!payload.budgetRange) {
    return labels.invalidBudgetRange;
  }

  if (!payload.timeline) {
    return labels.invalidTimeline;
  }

  return "";
}

type ContactValidationLabels = {
  invalidEmail: string;
  invalidMessage: string;
  invalidName: string;
  invalidNeedType: string;
  invalidPhone: string;
  invalidBudgetRange: string;
  invalidTimeline: string;
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

function SelectField({
  label,
  name,
  options,
  placeholder,
  required,
}: {
  label: string;
  name: ContactFormField;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#1B3A5C]/58">
        {label}
      </span>
      <select
        className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-4 text-base text-[#1A1A2E] outline-none transition focus:border-[#E8531A] focus:ring-4 focus:ring-[#E8531A]/12"
        name={name}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

import enMessages from "../messages/en.json";
import idMessages from "../messages/id.json";

export const DEFAULT_LOCALE = "id";
export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];
export type Messages = typeof idMessages;

const dictionaries: Record<Locale, Messages> = {
  id: idMessages,
  en: enMessages,
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

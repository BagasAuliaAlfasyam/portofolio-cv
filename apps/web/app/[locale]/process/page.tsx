import { notFound, redirect } from "next/navigation";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export default async function ProcessPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  redirect(`${locale === DEFAULT_LOCALE ? "/" : `/${locale}`}#process`);
}

import { ServiceLandingPage } from "@/components/service-landing-page";
import { DEFAULT_LOCALE, getMessages } from "@/lib/i18n";
import { createServicePageMetadata } from "@/lib/service-page-metadata";
import { servicePages } from "@/lib/service-pages";

const page = servicePages["custom-crm"];

export const metadata = createServicePageMetadata(page);

export default function CustomCrmPage() {
  return (
    <ServiceLandingPage messages={getMessages(DEFAULT_LOCALE)} page={page} />
  );
}

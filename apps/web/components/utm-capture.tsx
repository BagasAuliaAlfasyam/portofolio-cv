"use client";

import { useEffect } from "react";

export const UTM_STORAGE_KEY = "catalystforge_utm";

const utmParamMap = {
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmMedium: "utm_medium",
  utmSource: "utm_source",
  utmTerm: "utm_term",
} as const;

export type StoredUtm = Partial<Record<keyof typeof utmParamMap, string>>;

export function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured = Object.entries(utmParamMap).reduce<StoredUtm>(
      (accumulator, [payloadKey, queryKey]) => {
        const value = params.get(queryKey)?.trim();

        if (value) {
          accumulator[payloadKey as keyof StoredUtm] = value.slice(0, 120);
        }

        return accumulator;
      },
      {},
    );

    if (Object.keys(captured).length === 0) {
      return;
    }

    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
  }, []);

  return null;
}

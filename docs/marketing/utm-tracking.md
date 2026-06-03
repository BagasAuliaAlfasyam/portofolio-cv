# UTM Tracking Guide

## Goal

Semua campaign harus memakai UTM agar sumber lead dari form inquiry, WhatsApp,
dan analytics bisa dibaca dengan jelas.

## Naming Rules

| Parameter      | Format                    | Example                                                        |
| -------------- | ------------------------- | -------------------------------------------------------------- |
| `utm_source`   | channel atau platform     | `google`, `linkedin`, `whatsapp`, `email`, `instagram`         |
| `utm_medium`   | tipe traffic              | `cpc`, `organic`, `outbound`, `referral`, `social`             |
| `utm_campaign` | offer + audience + market | `crm_b2b_id`, `company_profile_id`, `ai_support_healthcare_id` |
| `utm_content`  | variasi pesan/kreatif     | `pain_sales_followup`, `demo_cta`, `case_study`                |
| `utm_term`     | keyword untuk search ads  | `jasa_crm_custom`, `website_company_profile`                   |

Gunakan huruf kecil, angka, dan underscore. Hindari spasi agar konsisten di
analytics dan email lead.

## Campaign URLs

```txt
https://catalystforge.web.id/company-profile?utm_source=google&utm_medium=cpc&utm_campaign=company_profile_id&utm_term=jasa_company_profile

https://catalystforge.web.id/custom-crm?utm_source=linkedin&utm_medium=outbound&utm_campaign=crm_b2b_id&utm_content=pain_sales_followup

https://catalystforge.web.id/custom-hris?utm_source=email&utm_medium=outbound&utm_campaign=hris_ops_id&utm_content=manual_payroll

https://catalystforge.web.id/custom-pos?utm_source=whatsapp&utm_medium=outbound&utm_campaign=pos_retail_id&utm_content=inventory_report

https://catalystforge.web.id/ai-support?utm_source=linkedin&utm_medium=outbound&utm_campaign=ai_support_id&utm_content=repeated_questions
```

## Implemented Tracking

- `UtmCapture` menyimpan `utm_source`, `utm_medium`, `utm_campaign`,
  `utm_content`, dan `utm_term` ke browser `localStorage`.
- Contact form mengirim UTM tersimpan, halaman asal, kebutuhan utama, budget,
  dan timeline ke backend.
- Backend memasukkan data tersebut ke email inquiry.
- `ConversionLink` mengirim event `lead_click`, `demo_click`, dan
  `demo_lead_click` ke `dataLayer` saat Google Analytics aktif.

## Reporting View

Minimal baca performa per minggu dengan kolom:

| Date       | Campaign     | Landing Page  | Leads | WhatsApp Clicks | Demo Clicks | Notes    |
| ---------- | ------------ | ------------- | ----- | --------------- | ----------- | -------- |
| 2026-06-01 | `crm_b2b_id` | `/custom-crm` | 0     | 0               | 0           | Baseline |

## QA Checklist

- Buka URL campaign dengan UTM.
- Submit form test ke backend staging atau production yang aman.
- Pastikan email inquiry memuat UTM dan landing page.
- Pastikan GA menerima event klik CTA setelah `NEXT_PUBLIC_GA_ID` diisi.
- Jangan pakai UTM pada link internal biasa agar atribusi campaign tidak kotor.

# Google Search Console Checklist

## Setup

1. Buat properti domain untuk `catalystforge.web.id` di Google Search Console.
2. Pilih metode verifikasi yang paling mudah:
   - DNS TXT record untuk domain property.
   - HTML meta tag dengan `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` untuk URL prefix.
3. Jika memakai meta tag, isi env:

```txt
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-site-verification-token
```

4. Redeploy agar metadata verification muncul di `<head>`.
5. Jalankan verifikasi di Google Search Console.

## Submit Sitemap

Submit sitemap berikut:

```txt
https://catalystforge.web.id/sitemap.xml
```

URL intent yang sudah masuk sitemap:

- `https://catalystforge.web.id/company-profile`
- `https://catalystforge.web.id/custom-crm`
- `https://catalystforge.web.id/custom-hris`
- `https://catalystforge.web.id/custom-pos`
- `https://catalystforge.web.id/ai-support`

## URL Inspection

Gunakan URL Inspection untuk halaman prioritas:

1. `/company-profile`
2. `/custom-crm`
3. `/custom-hris`
4. `/custom-pos`
5. `/ai-support`

Klik request indexing setelah halaman berhasil ter-crawl dan tidak ada masalah
metadata.

## Query Targets

| Page               | Query Theme                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `/company-profile` | jasa company profile, website perusahaan, website company profile |
| `/custom-crm`      | custom CRM, jasa pembuatan CRM, sistem sales pipeline             |
| `/custom-hris`     | custom HRIS, sistem karyawan, aplikasi absensi karyawan           |
| `/custom-pos`      | custom POS, sistem kasir, aplikasi inventory toko                 |
| `/ai-support`      | jasa chatbot AI, AI support, customer support automation          |

## Monthly Checks

- Performance: query, page, country, device.
- Indexing: halaman excluded, duplicate, atau crawled not indexed.
- Enhancements: metadata, robots, dan sitemap.
- Opportunities: query dengan impression tinggi tetapi CTR rendah perlu headline
  dan meta description yang lebih tajam.

export type ServiceSlug =
  | "ai-support"
  | "company-profile"
  | "custom-crm"
  | "custom-hris"
  | "custom-pos";

export type ServicePage = {
  bestFor: string;
  caseStudy: {
    context: string;
    impact: string;
    summary: string;
    title: string;
  };
  deliverables: string[];
  demoHref: string;
  demoLabel: string;
  description: string;
  eyebrow: string;
  faq: Array<{
    answer: string;
    question: string;
  }>;
  headline: string;
  keywords: string[];
  metaTitle: string;
  outcomes: string[];
  primaryCta: string;
  problems: string[];
  secondaryCta: string;
  slug: ServiceSlug;
  timeline: string;
  workflow: Array<{
    label: string;
    text: string;
  }>;
};

export const servicePages: Record<ServiceSlug, ServicePage> = {
  "company-profile": {
    bestFor:
      "Perusahaan jasa, manufaktur, distributor, healthcare, pendidikan, dan organisasi yang butuh kredibilitas digital.",
    caseStudy: {
      context: "Website korporat dan landing page layanan",
      impact:
        "Calon pelanggan lebih cepat memahami layanan, kredibilitas, dan jalur kontak yang harus dipilih.",
      summary:
        "CatalystForge menyiapkan struktur konten, tampilan responsif, CTA inquiry, SEO dasar, dan handover agar website mudah dipakai tim internal.",
      title: "Company profile yang siap dipakai untuk sales enablement",
    },
    deliverables: [
      "Struktur halaman beranda, tentang, layanan, project, dan kontak",
      "Copywriting positioning, value proposition, dan call-to-action",
      "Form inquiry, WhatsApp CTA, metadata SEO, sitemap, dan robots",
      "Deploy ke domain, setup analytics dasar, dan handover konten",
    ],
    demoHref: "https://company.catalystforge.web.id",
    demoLabel: "Buka Demo Company Profile",
    description:
      "Landing page company profile untuk bisnis yang butuh website profesional, kredibel, cepat ditemukan, dan siap dipakai tim sales.",
    eyebrow: "Company Profile Launch",
    faq: [
      {
        answer:
          "Bisa. Kami bantu susun struktur, headline, narasi layanan, dan CTA dari bahan awal yang Anda punya.",
        question: "Apakah bisa dibantu dari nol kalau konten belum siap?",
      },
      {
        answer:
          "Bisa bertahap. Versi awal bisa fokus kredibilitas, lalu ditambah blog, katalog, career, atau integrasi CRM.",
        question: "Apakah website bisa dikembangkan setelah launch?",
      },
    ],
    headline:
      "Website company profile yang membuat bisnis terlihat kredibel dan mudah dihubungi",
    keywords: [
      "jasa company profile",
      "website company profile",
      "website perusahaan",
      "jasa pembuatan website Bandung",
    ],
    metaTitle: "Jasa Company Profile Website",
    outcomes: [
      "Brand terlihat lebih serius saat dikirim ke calon klien atau tender",
      "Pengunjung paham layanan, proof, dan langkah kontak dalam satu alur",
      "Tim sales punya aset digital yang konsisten untuk follow-up",
    ],
    primaryCta: "Minta Estimasi Website",
    problems: [
      "Company profile masih berupa PDF yang sulit ditemukan calon pelanggan",
      "Website lama tidak menjelaskan layanan, proof, dan CTA dengan jelas",
      "Tim sales butuh link profesional untuk dikirim ke prospek",
    ],
    secondaryCta: "Lihat Demo",
    slug: "company-profile",
    timeline: "2-4 minggu",
    workflow: [
      {
        label: "Discovery",
        text: "Memetakan positioning, target pelanggan, layanan utama, dan bukti kredibilitas.",
      },
      {
        label: "Content & UI",
        text: "Menyusun struktur halaman, copy, visual hierarchy, dan komponen CTA.",
      },
      {
        label: "Build & Deploy",
        text: "Membangun website responsif, setup SEO dasar, analytics, dan deploy domain.",
      },
    ],
  },
  "custom-crm": {
    bestFor:
      "Tim sales B2B, distributor, agency, sekolah, klinik, dan bisnis dengan pipeline prospek yang perlu ditertibkan.",
    caseStudy: {
      context: "Workflow data pelanggan dan follow-up",
      impact:
        "Sales manager lebih mudah melihat pipeline aktif, prioritas follow-up, dan histori komunikasi.",
      summary:
        "CRM custom dibangun mengikuti proses aktual: status prospek, akun, task, activity, laporan, dan role akses internal.",
      title: "CRM custom untuk pipeline yang tidak cocok dengan spreadsheet",
    },
    deliverables: [
      "Dashboard pipeline, akun, kontak, activity, dan task follow-up",
      "Stage penjualan yang mengikuti proses bisnis internal",
      "Import/export data, filter, pencarian, dan role sederhana",
      "Deploy, dokumentasi penggunaan, dan support awal",
    ],
    demoHref: "https://crm.catalystforge.web.id",
    demoLabel: "Buka Demo CRM",
    description:
      "CRM custom untuk bisnis yang ingin merapikan pipeline, follow-up, data pelanggan, dan laporan sales sesuai workflow sendiri.",
    eyebrow: "Custom CRM",
    faq: [
      {
        answer:
          "Bisa. Data spreadsheet dapat dijadikan baseline untuk struktur akun, kontak, pipeline, dan aktivitas.",
        question: "Apakah bisa migrasi dari spreadsheet?",
      },
      {
        answer:
          "Bisa disiapkan bertahap setelah workflow inti stabil, misalnya integrasi form website, email, WhatsApp link, atau dashboard manajemen.",
        question: "Apakah bisa integrasi dengan channel lead?",
      },
    ],
    headline:
      "CRM custom untuk pipeline sales, follow-up, dan data pelanggan yang lebih rapi",
    keywords: [
      "custom CRM Indonesia",
      "jasa pembuatan CRM",
      "sistem sales pipeline",
      "CRM untuk bisnis",
    ],
    metaTitle: "Custom CRM untuk Pipeline Sales",
    outcomes: [
      "Pipeline lebih transparan untuk sales dan manajemen",
      "Follow-up tidak tercecer karena aktivitas dan task tercatat",
      "Laporan sales lebih mudah dibaca tanpa rekap manual berulang",
    ],
    primaryCta: "Diskusi CRM Custom",
    problems: [
      "Lead masuk dari banyak channel tetapi statusnya tidak terpantau",
      "Follow-up bergantung pada catatan personal sales",
      "Management sulit membaca pipeline karena data tersebar di spreadsheet",
    ],
    secondaryCta: "Coba Demo CRM",
    slug: "custom-crm",
    timeline: "4-8 minggu",
    workflow: [
      {
        label: "Pipeline Mapping",
        text: "Memetakan sumber lead, stage, ownership, aktivitas, dan laporan yang dibutuhkan.",
      },
      {
        label: "MVP Build",
        text: "Membangun modul inti agar tim bisa mulai mencatat akun, deal, dan follow-up.",
      },
      {
        label: "Review & Scale",
        text: "Menambah automasi, laporan, dan integrasi setelah penggunaan harian terbukti.",
      },
    ],
  },
  "custom-hris": {
    bestFor:
      "Bisnis yang mulai kesulitan mengelola data karyawan, absensi, payroll, cuti, dan administrasi HR secara manual.",
    caseStudy: {
      context: "Sistem internal dan dashboard operasional",
      impact:
        "Data HR lebih mudah dicari, proses administrasi lebih konsisten, dan laporan lebih siap untuk evaluasi.",
      summary:
        "HRIS custom disiapkan bertahap mulai dari data karyawan, attendance, cuti, payroll summary, hingga role admin dan manager.",
      title: "HRIS custom untuk operasional SDM yang lebih tertata",
    },
    deliverables: [
      "Database karyawan, struktur departemen, jabatan, dan status kerja",
      "Absensi, cuti, payroll summary, dan approval sederhana",
      "Dashboard HR, filter laporan, dan export data",
      "Role admin/manager, dokumentasi, dan support awal",
    ],
    demoHref: "https://hris.catalystforge.web.id",
    demoLabel: "Buka Demo HRIS",
    description:
      "HRIS custom untuk merapikan data karyawan, absensi, cuti, payroll, approval, dan laporan HR sesuai kebijakan perusahaan.",
    eyebrow: "Custom HRIS",
    faq: [
      {
        answer:
          "Bisa. Modul dapat dimulai dari data karyawan dan absensi, lalu payroll atau approval ditambahkan bertahap.",
        question: "Apakah harus langsung lengkap semua modul?",
      },
      {
        answer:
          "Bisa disesuaikan dengan format data yang tersedia, selama struktur datanya dapat dipetakan dengan jelas.",
        question: "Apakah bisa import data karyawan lama?",
      },
    ],
    headline:
      "HRIS custom untuk data karyawan, absensi, cuti, dan payroll yang lebih terkendali",
    keywords: [
      "custom HRIS Indonesia",
      "jasa pembuatan HRIS",
      "sistem karyawan",
      "aplikasi absensi karyawan",
    ],
    metaTitle: "Custom HRIS untuk Operasional Karyawan",
    outcomes: [
      "Data karyawan lebih terpusat dan mudah diperbarui",
      "Proses cuti, absensi, dan payroll lebih konsisten",
      "HR memiliki laporan yang lebih siap untuk keputusan operasional",
    ],
    primaryCta: "Diskusi HRIS Custom",
    problems: [
      "Data karyawan tersebar di spreadsheet, file, atau chat",
      "Absensi, cuti, dan payroll membutuhkan rekap manual berulang",
      "HR sulit menyajikan laporan cepat untuk manajemen",
    ],
    secondaryCta: "Coba Demo HRIS",
    slug: "custom-hris",
    timeline: "4-8 minggu",
    workflow: [
      {
        label: "Policy Mapping",
        text: "Memetakan aturan absensi, cuti, payroll, approval, dan struktur organisasi.",
      },
      {
        label: "Core HR Build",
        text: "Membangun modul data karyawan, attendance, request, dan dashboard HR.",
      },
      {
        label: "Handover",
        text: "Menyiapkan dokumentasi, import data, review akses, dan support go-live.",
      },
    ],
  },
  "custom-pos": {
    bestFor:
      "Retail, F&B, toko cabang, distributor kecil, dan bisnis penjualan yang butuh transaksi, stok, dan laporan lebih rapi.",
    caseStudy: {
      context: "Transaksi, inventory, dan laporan cabang",
      impact:
        "Owner dan admin lebih mudah melihat transaksi, stok bergerak, produk laris, dan laporan penjualan.",
      summary:
        "POS custom dapat dimulai dari kasir, katalog produk, transaksi, stok, laporan harian, dan kontrol cabang sederhana.",
      title: "POS custom untuk transaksi dan inventory yang lebih terlihat",
    },
    deliverables: [
      "Kasir, katalog produk, transaksi, diskon, dan metode pembayaran",
      "Inventory, stok masuk/keluar, dan peringatan stok rendah",
      "Laporan penjualan, produk, cabang, dan export data",
      "Role kasir/admin, deploy, dokumentasi, dan support awal",
    ],
    demoHref: "https://pos.catalystforge.web.id",
    demoLabel: "Buka Demo POS",
    description:
      "POS custom untuk bisnis yang ingin mengelola transaksi, stok, cabang, produk, dan laporan penjualan dalam satu sistem.",
    eyebrow: "Custom POS",
    faq: [
      {
        answer:
          "Bisa. Struktur cabang, role pengguna, dan laporan dapat disiapkan sejak MVP.",
        question: "Apakah bisa untuk beberapa cabang?",
      },
      {
        answer:
          "Bisa, tergantung kebutuhan. MVP dapat mulai dari transaksi dan stok, lalu integrasi printer atau payment ditambahkan setelah flow kasir stabil.",
        question: "Apakah bisa integrasi printer atau payment?",
      },
    ],
    headline:
      "POS custom untuk transaksi, stok, dan laporan penjualan yang lebih jelas",
    keywords: [
      "custom POS Indonesia",
      "jasa pembuatan POS",
      "sistem kasir",
      "aplikasi inventory toko",
    ],
    metaTitle: "Custom POS untuk Transaksi dan Inventory",
    outcomes: [
      "Transaksi harian tercatat lebih konsisten",
      "Stok lebih mudah dipantau dari produk dan cabang",
      "Laporan penjualan bisa dibaca tanpa rekap manual panjang",
    ],
    primaryCta: "Diskusi POS Custom",
    problems: [
      "Transaksi kasir belum terhubung dengan stok dan laporan",
      "Owner sulit memantau performa produk atau cabang",
      "Rekap penjualan membutuhkan banyak koreksi manual",
    ],
    secondaryCta: "Coba Demo POS",
    slug: "custom-pos",
    timeline: "4-8 minggu",
    workflow: [
      {
        label: "Sales Flow",
        text: "Memetakan proses kasir, stok, produk, retur, cabang, dan laporan utama.",
      },
      {
        label: "POS MVP",
        text: "Membangun modul transaksi, inventory, dashboard, dan export laporan.",
      },
      {
        label: "Operational Review",
        text: "Menguji alur harian, role kasir/admin, dan kebutuhan integrasi tambahan.",
      },
    ],
  },
  "ai-support": {
    bestFor:
      "Bisnis dengan pertanyaan pelanggan berulang, knowledge base internal, FAQ layanan, atau kebutuhan chatbot sebagai first response.",
    caseStudy: {
      context: "Pomeng Chatbot - RS Prima Inti Medika",
      impact:
        "Pengguna dapat memperoleh arahan dan informasi layanan dengan pengalaman tanya-jawab yang lebih mudah.",
      summary:
        "Chatbot disusun sebagai assistant guide yang menjawab kebutuhan informasi pengguna berdasarkan konteks layanan.",
      title: "AI support untuk pertanyaan berulang dan panduan layanan",
    },
    deliverables: [
      "AI chatbot atau assistant flow sesuai kebutuhan layanan",
      "Knowledge base, prompt, fallback, dan human handoff",
      "Console percakapan, audit respons, dan analytics dasar",
      "Deploy, monitoring awal, dan iterasi jawaban",
    ],
    demoHref: "https://ai.catalystforge.web.id",
    demoLabel: "Buka Demo AI Support",
    description:
      "AI support dan chatbot untuk membantu pelanggan mendapatkan jawaban lebih cepat, konsisten, dan tetap bisa diarahkan ke tim manusia.",
    eyebrow: "AI Automation Sprint",
    faq: [
      {
        answer:
          "Bisa. AI disiapkan dengan fallback human handoff agar pertanyaan sensitif atau di luar konteks tetap diteruskan ke tim.",
        question: "Apakah AI bisa dialihkan ke admin manusia?",
      },
      {
        answer:
          "Bisa. Knowledge base dapat dimulai dari FAQ, dokumen layanan, SOP, katalog, atau percakapan customer support yang sudah ada.",
        question: "Sumber pengetahuan AI bisa dari mana?",
      },
    ],
    headline:
      "AI support dan chatbot untuk menjawab pelanggan lebih cepat dan konsisten",
    keywords: [
      "AI support Indonesia",
      "jasa chatbot AI",
      "customer support automation",
      "AI knowledge base",
    ],
    metaTitle: "AI Support dan Chatbot untuk Bisnis",
    outcomes: [
      "Pertanyaan berulang dijawab lebih cepat tanpa menunggu admin",
      "Jawaban lebih konsisten karena knowledge base terstruktur",
      "Tim bisa memantau percakapan dan memperbaiki respons bertahap",
    ],
    primaryCta: "Diskusi AI Support",
    problems: [
      "Customer service sering menjawab pertanyaan yang sama berulang kali",
      "Informasi layanan tersebar dan jawaban antar admin tidak konsisten",
      "Tim butuh first response cepat tanpa menghilangkan human handoff",
    ],
    secondaryCta: "Coba Demo AI",
    slug: "ai-support",
    timeline: "1-3 minggu",
    workflow: [
      {
        label: "Knowledge Mapping",
        text: "Mengumpulkan FAQ, SOP, dokumen layanan, batasan respons, dan skenario handoff.",
      },
      {
        label: "Assistant Build",
        text: "Membangun flow chatbot, prompt, knowledge base, console, dan tracking percakapan.",
      },
      {
        label: "Tune & Monitor",
        text: "Menguji jawaban, memperbaiki prompt, dan memantau kualitas respons awal.",
      },
    ],
  },
};

export const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];

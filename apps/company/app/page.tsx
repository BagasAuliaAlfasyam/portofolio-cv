"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Variants } from "framer-motion";
import { ContactPersonModal } from "@repo/ui/contact-person-modal";
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  Factory,
  Globe2,
  Handshake,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Quote,
  Recycle,
  ShieldCheck,
  Sprout,
  Star,
  Target,
  TrendingUp,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#d7a332] px-6 py-3 text-sm font-bold text-[#17341f] shadow-lg shadow-amber-900/10 transition hover:bg-[#efbd4b]";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15";

function SectionBadge({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-emerald-900/15 bg-emerald-900/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-emerald-950/10 bg-[#f8f4e9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1f5a35]">
            <Leaf className="h-5 w-5 text-[#f2c65d]" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-black tracking-wide text-[#17341f]">
              PT Sawit Lestari
            </span>
            <span className="block text-xs font-semibold text-[#6d6a57]">
              Nusantara
            </span>
          </div>
        </a>
        <div className="hidden items-center gap-7 text-sm font-semibold text-[#5f614f] md:flex">
          {[
            ["Tentang", "/about"],
            ["Operasi", "/operations"],
            ["Keberlanjutan", "/sustainability"],
            ["Tata Kelola", "/governance"],
            ["Kontak", "/contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-[#1f5a35]"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="/contact"
          className="rounded-md bg-[#1f5a35] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#174528]"
        >
          Hubungi Kami
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const stats = [
    { value: "28.400", label: "Ha areal kelola", icon: Globe2 },
    { value: "6", label: "Unit kebun inti", icon: Sprout },
    { value: "2", label: "Pabrik kelapa sawit", icon: Factory },
    { value: "4.800+", label: "Tenaga kerja lokal", icon: Users },
  ];

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-16 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=2200&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#112617]/95 via-[#17341f]/82 to-[#17341f]/35" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f8f4e9] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(92vh-4rem)] max-w-7xl items-center px-5 py-16 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-[#f2c65d]" />
            Perusahaan perkebunan dan pengolahan sawit berkelanjutan
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mb-7 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Mengelola hasil bumi untuk pertumbuhan yang berkelanjutan.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mb-9 max-w-2xl text-lg leading-8 text-[#e8eadb]"
          >
            PT Sawit Lestari Nusantara mengintegrasikan kebun, pabrik, logistik,
            dan kemitraan petani untuk menghasilkan minyak sawit yang andal,
            transparan, dan bertanggung jawab bagi industri Indonesia.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a href="#operations" className={primaryButton}>
              Lihat Operasi <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#sustainability" className={secondaryButton}>
              Komitmen ESG
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="relative z-10 mx-auto -mt-14 grid max-w-7xl grid-cols-2 gap-3 px-5 pb-10 lg:grid-cols-4 lg:px-8"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-emerald-950/10 bg-[#fffaf0] p-5 shadow-xl shadow-emerald-950/5"
          >
            <item.icon className="mb-4 h-6 w-6 text-[#1f5a35]" />
            <div className="text-3xl font-black text-[#17341f]">
              {item.value}
            </div>
            <div className="mt-1 text-sm font-semibold text-[#6d6a57]">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  const values = [
    {
      icon: Target,
      title: "Produktivitas Terukur",
      desc: "Manajemen blok, panen, dan rendemen dikawal melalui indikator lapangan yang jelas.",
    },
    {
      icon: ShieldCheck,
      title: "Kepatuhan Operasional",
      desc: "SOP, K3, legalitas lahan, dan audit pemasok menjadi dasar pengelolaan.",
    },
    {
      icon: Handshake,
      title: "Kemitraan Petani",
      desc: "Skema pembinaan plasma dan pemasok TBS lokal dibangun untuk nilai tambah bersama.",
    },
    {
      icon: TrendingUp,
      title: "Nilai Jangka Panjang",
      desc: "Investasi diarahkan pada efisiensi pabrik, kualitas produk, dan ketahanan rantai pasok.",
    },
  ];

  return (
    <section id="about" className="bg-[#f8f4e9] py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
        >
          <SectionBadge icon={Building2}>Tentang perusahaan</SectionBadge>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-[#17341f] md:text-5xl">
            Dari kebun sampai distribusi, setiap tahap dikelola dengan disiplin
            industri.
          </h2>
          <p className="mb-5 text-lg leading-8 text-[#5f614f]">
            Kami memadukan pengalaman agronomi, fasilitas pengolahan, dan
            kemitraan daerah untuk menjaga pasokan TBS, CPO, dan kernel tetap
            konsisten. Pendekatannya sederhana: lahan produktif, pekerja
            terlindungi, proses pabrik efisien, dan dampak lingkungan
            dikendalikan.
          </p>
          <p className="text-[#5f614f]">
            Gaya komunikasinya mengikuti karakter perusahaan nasional seperti
            referensi PGN dan PTPN: tegas, institusional, menonjolkan layanan,
            angka operasional, serta komitmen keberlanjutan.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2"
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-md border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <item.icon className="mb-5 h-8 w-8 text-[#1f5a35]" />
              <h3 className="mb-2 text-lg font-black text-[#17341f]">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-[#6d6a57]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Operations() {
  const services = [
    {
      icon: Sprout,
      title: "Perkebunan Inti & Plasma",
      desc: "Pengelolaan tanaman menghasilkan, peremajaan, pemupukan, dan pendampingan petani mitra.",
      tone: "bg-[#1f5a35]",
    },
    {
      icon: Factory,
      title: "Pengolahan CPO & Kernel",
      desc: "Pabrik kelapa sawit dengan kontrol mutu, efisiensi energi, dan pemantauan rendemen harian.",
      tone: "bg-[#385d2c]",
    },
    {
      icon: Truck,
      title: "Logistik TBS",
      desc: "Rute angkut, jembatan timbang, dan jadwal penerimaan diatur untuk menjaga kesegaran buah.",
      tone: "bg-[#8a6a20]",
    },
    {
      icon: BarChart3,
      title: "Traceability Produk",
      desc: "Pencatatan sumber TBS, batch produksi, dan dokumen penjualan untuk audit rantai pasok.",
      tone: "bg-[#315f58]",
    },
    {
      icon: Droplets,
      title: "Pengelolaan Air & Limbah",
      desc: "Kolam limbah, pemanfaatan biomassa, dan pemantauan kualitas air dilakukan berkala.",
      tone: "bg-[#2c6476]",
    },
    {
      icon: Award,
      title: "Mutu & Sertifikasi",
      desc: "Standar kerja disiapkan untuk mendukung ISPO, RSPO, K3, dan persyaratan pelanggan industri.",
      tone: "bg-[#5c4b1f]",
    },
  ];

  return (
    <section id="operations" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 max-w-3xl"
        >
          <SectionBadge icon={Factory}>Operasi terpadu</SectionBadge>
          <h2 className="mb-5 text-4xl font-black tracking-tight text-[#17341f] md:text-5xl">
            Rantai operasi sawit yang rapi dari lapangan hingga produk industri.
          </h2>
          <p className="text-lg leading-8 text-[#5f614f]">
            Struktur konten dibuat lebih dekat dengan profil perusahaan sumber
            daya alam: layanan bisnis, proses berlangganan/kemitraan, angka
            dampak, dan komitmen keberlanjutan.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-md border border-emerald-950/10 bg-[#f8f4e9] p-7 transition"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-md ${item.tone}`}
              >
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-black text-[#17341f]">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-[#5f614f]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Sustainability() {
  const items = [
    {
      icon: Leaf,
      title: "Konservasi dan HCV",
      desc: "Area bernilai konservasi tinggi dipetakan, dipantau, dan dipisahkan dari aktivitas produksi.",
    },
    {
      icon: Recycle,
      title: "Sirkularitas Pabrik",
      desc: "Cangkang, serat, dan limbah cair diarahkan menjadi energi proses dan pupuk organik.",
    },
    {
      icon: Droplets,
      title: "Air dan Efluen",
      desc: "Parameter limbah cair dipantau berkala sebelum pemanfaatan atau pelepasan sesuai aturan.",
    },
  ];

  return (
    <section
      id="sustainability"
      className="relative overflow-hidden bg-[#17341f] py-28 text-white"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#17341f] via-[#17341f]/95 to-[#17341f]/78" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f2c65d]">
            <Leaf className="h-4 w-4" />
            Keberlanjutan
          </div>
          <h2 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">
            Menjaga produktivitas tanpa melepas tanggung jawab lingkungan.
          </h2>
          <p className="text-lg leading-8 text-[#d9dfcf]">
            Perusahaan sumber daya alam harus terlihat kuat di aspek ESG. Bagian
            ini dibuat seperti halaman keberlanjutan korporat: ringkas, berbasis
            program, dan mudah dikembangkan menjadi laporan tahunan.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-md border border-white/12 bg-white/10 p-6 backdrop-blur"
            >
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#d7a332]">
                  <item.icon className="h-6 w-6 text-[#17341f]" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-black">{item.title}</h3>
                  <p className="text-sm leading-7 text-[#d9dfcf]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Governance() {
  const steps = [
    [
      "01",
      "Survey dan legalitas lahan",
      "Validasi batas areal, status lahan, dan potensi sosial sebelum pengembangan.",
    ],
    [
      "02",
      "Rencana tanam dan panen",
      "Blok kerja disusun berdasarkan umur tanaman, akses jalan, curah hujan, dan kapasitas pabrik.",
    ],
    [
      "03",
      "Audit mutu dan K3",
      "Tim lapangan dan pabrik menjalankan inspeksi, pelaporan insiden, serta tindakan korektif.",
    ],
    [
      "04",
      "Pelaporan stakeholder",
      "Kinerja produksi, lingkungan, dan sosial disiapkan untuk manajemen, mitra, dan pelanggan.",
    ],
  ];

  return (
    <section id="governance" className="bg-[#f8f4e9] py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <SectionBadge icon={ClipboardCheck}>Tata kelola</SectionBadge>
          <h2 className="mx-auto mb-5 max-w-3xl text-4xl font-black tracking-tight text-[#17341f] md:text-5xl">
            Tata kelola yang jelas untuk menjaga kepercayaan pelanggan dan
            mitra.
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#5f614f]">
            Bagian proses dibuat mirip ritme website korporat BUMN: bertahap,
            formal, dan mudah dipahami oleh calon investor, mitra, maupun
            pembeli industri.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-4 lg:grid-cols-4"
        >
          {steps.map(([number, title, desc]) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="rounded-md border border-emerald-950/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 text-4xl font-black text-[#d7a332]">
                {number}
              </div>
              <h3 className="mb-3 text-lg font-black text-[#17341f]">
                {title}
              </h3>
              <p className="text-sm leading-7 text-[#5f614f]">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote:
        "Pasokan TBS lebih stabil dan dokumentasi pengiriman rapi, sehingga proses produksi kami lebih mudah diprediksi.",
      author: "R. Mahendra",
      company: "Mitra Pabrik Hilir",
      rating: 5,
    },
    {
      quote:
        "Pendampingan agronomi membuat petani plasma lebih disiplin dalam panen dan perawatan tanaman.",
      author: "S. Kartika",
      company: "Koperasi Tani Sejahtera",
      rating: 5,
    },
    {
      quote:
        "Komunikasi komersial dan dokumen mutu berjalan profesional untuk kebutuhan audit pelanggan kami.",
      author: "H. Wijaya",
      company: "Pembeli Industri",
      rating: 5,
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 max-w-3xl"
        >
          <SectionBadge icon={Quote}>Kepercayaan mitra</SectionBadge>
          <h2 className="mb-5 text-4xl font-black tracking-tight text-[#17341f] md:text-5xl">
            Dibangun bersama petani, pemasok, dan pelanggan industri.
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-5 md:grid-cols-3"
        >
          {reviews.map((item) => (
            <motion.div
              key={item.author}
              variants={fadeUp}
              className="rounded-md border border-emerald-950/10 bg-[#f8f4e9] p-7"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#d7a332] text-[#d7a332]"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-7 text-[#4f5946]">
                &quot;{item.quote}&quot;
              </p>
              <div className="font-black text-[#17341f]">{item.author}</div>
              <div className="text-sm font-semibold text-[#8a6a20]">
                {item.company}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [contactFeature, setContactFeature] = useState<string | null>(null);

  return (
    <section id="contact" className="bg-[#f8f4e9] py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionBadge icon={Mail}>Kontak</SectionBadge>
          <h2 className="mb-6 text-4xl font-black tracking-tight text-[#17341f] md:text-5xl">
            Diskusikan kebutuhan pasokan, kemitraan, atau profil perusahaan.
          </h2>
          <p className="mb-9 text-lg leading-8 text-[#5f614f]">
            Form dan kontak dibuat untuk kebutuhan company profile: inquiry
            bisnis, pengadaan, investor relation, dan kemitraan petani.
          </p>
          <div className="space-y-5">
            {[
              { icon: Mail, label: "corsec@sawitlestari.co.id" },
              { icon: Phone, label: "+62 21 5088 2710" },
              { icon: MapPin, label: "Jl. HR Rasuna Said, Jakarta Selatan" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 text-[#4f5946]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-[#1f5a35]" />
                </div>
                <span className="font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-md border border-emerald-950/10 bg-white p-7 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            setContactFeature("Company profile inquiry form");
          }}
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-[#17341f]">
              Nama Lengkap
              <input
                type="text"
                className="rounded-md border border-emerald-950/15 bg-[#f8f4e9] px-4 py-3 font-medium outline-none transition focus:border-[#1f5a35]"
                placeholder="Nama anda"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#17341f]">
              Email Perusahaan
              <input
                type="email"
                className="rounded-md border border-emerald-950/15 bg-[#f8f4e9] px-4 py-3 font-medium outline-none transition focus:border-[#1f5a35]"
                placeholder="nama@perusahaan.co.id"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#17341f]">
              Kebutuhan
              <textarea
                rows={5}
                className="resize-none rounded-md border border-emerald-950/15 bg-[#f8f4e9] px-4 py-3 font-medium outline-none transition focus:border-[#1f5a35]"
                placeholder="Ceritakan kebutuhan pasokan, kemitraan, atau profil perusahaan..."
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1f5a35] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#174528]"
            >
              Kirim Inquiry <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.form>
      </div>
      <ContactPersonModal
        open={Boolean(contactFeature)}
        onClose={() => setContactFeature(null)}
        featureName={contactFeature ?? undefined}
        appName="Company Profile Platform"
      />
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-[#17341f] py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#d7a332]">
            <Leaf className="h-5 w-5 text-[#17341f]" />
          </div>
          <span className="text-sm font-semibold text-[#d9dfcf]">
            2026 PT Sawit Lestari Nusantara. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#b7c2ad]">
          Built by{" "}
          <a
            href="https://catalystforge.web.id"
            className="text-[#f2c65d] hover:underline"
          >
            Catalyst Forge
          </a>
          <ChevronRight className="h-3 w-3" />
          <span>Company Profile Showcase</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#f8f4e9]">
      <Navbar />
      <Hero />
      <About />
      <Operations />
      <Sustainability />
      <Governance />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;
const lines = [
  ['Tenda sarnafil 5×5', '2 unit', '3 hari'],
  ['Kursi futura', '50 unit', '3 hari'],
  ['Sound system 2000W', '1 unit', '3 hari'],
];

/** Hero: satu urutan animasi saat halaman dibuka + nota sewa dengan parallax ringan. */
export function Hero({ app }: { app: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-sm font-medium text-sage">Untuk vendor rental alat dan event</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl">
            Pesanan, invoice, dan laporan bisnis sewa Anda, diurus lewat chat.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-6 max-w-[34rem] text-lg leading-relaxed text-stone">
            Intamio menyatukan pesanan klien, invoice, laporan keuangan, tim, dan laporan lapangan dalam satu dashboard.
            Kirim perintah ke agen AI di Telegram, dan dashboard ikut berubah.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#harga" className="btn">Mulai Langganan</a>
            <a href={app} className="btn-quiet">Masuk</a>
          </motion.div>
          <p className="mt-5 text-sm text-stone">Cukup browser dan Telegram. Tidak perlu instal aplikasi.</p>
        </div>

        {/* Nota sewa */}
        <motion.div style={{ y, rotate }} className="relative mx-auto w-full max-w-md" aria-hidden>
          <motion.div initial={{ opacity: 0, y: 30, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="relative rounded-[6px] bg-white p-7 shadow-[0_30px_60px_-30px_rgba(28,40,38,0.35)] ring-1 ring-line">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg font-semibold text-ink">Nota sewa ORD-0012</div>
                <div className="text-sm text-stone">PT Maju Jaya, mulai 22 Oktober</div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 1.6, rotate: -18 }} animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 1.5 }}
                className="rounded-md border-2 border-sage px-2 py-0.5 font-display text-sm font-bold text-sage">Versi 2</motion.div>
            </div>
            <div className="mt-6 divide-y divide-dashed divide-line border-y border-dashed border-line">
              {lines.map((l, i) => (
                <motion.div key={l[0]} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease, delay: 0.7 + i * 0.18 }}
                  className="grid grid-cols-[1fr_auto_auto] gap-4 py-3 text-sm">
                  <span className="text-ink">{l[0]}{i === 2 && <span className="ml-2 rounded bg-sage-soft px-1.5 py-0.5 text-xs text-sage">revisi</span>}</span>
                  <span className="text-stone">{l[1]}</span><span className="w-14 text-right text-stone">{l[2]}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between">
              <span className="text-sm text-stone">Total dihitung otomatis</span>
              <span className="font-display text-2xl font-semibold text-ink">Rp…</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 1.8 }}
            className="absolute -bottom-6 -left-4 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#8FC2B3]" />Diperbarui dari Telegram
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

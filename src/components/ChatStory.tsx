'use client';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

type Msg = { me?: boolean; body: React.ReactNode };
const MESSAGES: Msg[] = [
  { me: true, body: 'Pesanan klien PT Maju: tenda 2, kursi 50, mulai 22 Okt, 3 hari' },
  { body: (<>
      <div className="font-semibold text-ink">Ringkasan pesanan baru</div>
      <div className="mt-1 text-stone">PT Maju Jaya, 3 hari<br />Tenda 5×5 × 2<br />Kursi × 50</div>
      <div className="mt-1 font-semibold text-ink">Total: Rp…</div>
      <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs font-semibold">
        <span className="rounded-lg bg-sage py-1.5 text-center text-white">Konfirmasi</span>
        <span className="rounded-lg bg-mist py-1.5 text-center text-stone">Ubah</span>
      </div></>) },
  { me: true, body: 'Konfirmasi' },
  { me: true, body: 'Klien PT Maju revisi, tambah sound system 1' },
  { body: (<>
      Pesanan diperbarui ke <b>versi 2</b>. Total dihitung ulang, versi lama tetap tersimpan.
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-paper p-2">
        <span className="flex h-8 w-8 items-center justify-center rounded bg-[#B5523F] text-[10px] font-bold text-white">PDF</span>
        <span className="text-xs"><b className="text-ink">Invoice-PT-Maju-v2.pdf</b><br /><span className="text-stone">Dengan template invoice Anda</span></span>
      </div></>) },
];
/** Keadaan panel dashboard untuk setiap langkah percakapan. */
const PANEL = [
  { status: 'Menunggu perintah', version: null, items: [] as string[] },
  { status: 'Menunggu perintah', version: null, items: [] },
  { status: 'Menunggu konfirmasi', version: null, items: ['Tenda 5×5 × 2', 'Kursi × 50'] },
  { status: 'Tersimpan', version: 1, items: ['Tenda 5×5 × 2', 'Kursi × 50'] },
  { status: 'Diproses', version: 1, items: ['Tenda 5×5 × 2', 'Kursi × 50'] },
  { status: 'Tersimpan', version: 2, items: ['Tenda 5×5 × 2', 'Kursi × 50', 'Sound system × 1'] },
];

function Bubble({ m }: { m: Msg }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease }}
      className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[86%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${m.me ? 'rounded-br-md bg-sage-soft text-ink' : 'rounded-bl-md bg-white text-ink shadow-sm'}`}>{m.body}</div>
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-14 gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-stone/60" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </motion.div>
  );
}

function Phone({ step }: { step: number }) {
  const botNext = step < MESSAGES.length && !MESSAGES[step].me && step > 0;
  return (
    <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-[0_40px_80px_-40px_rgba(28,40,38,0.55)]">
      <div className="flex items-center gap-3 bg-[#40685F] px-4 py-3 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-display font-bold">I</div>
        <div><div className="text-sm font-semibold">Intamio Bot</div><div className="text-xs text-white/70">{botNext ? 'sedang mengetik…' : 'bot'}</div></div>
      </div>
      <div className="flex h-[31rem] flex-col justify-end gap-2.5 overflow-hidden bg-[#E6ECE9] p-3">
        {MESSAGES.slice(0, step).map((m, i) => <Bubble key={i} m={m} />)}
        <AnimatePresence>{botNext && <Typing key="t" />}</AnimatePresence>
      </div>
    </div>
  );
}

function Panel({ step }: { step: number }) {
  const s = PANEL[Math.min(step, PANEL.length - 1)];
  return (
    <div className="rounded-xl bg-white p-6 ring-1 ring-line">
      <div className="flex items-center justify-between">
        <div className="font-display text-lg font-semibold text-ink">Dashboard: pesanan PT Maju Jaya</div>
        <AnimatePresence mode="wait">
          {s.version && (
            <motion.span key={s.version} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="whitespace-nowrap rounded-full bg-sage-soft px-2.5 py-0.5 text-xs font-semibold text-sage">Versi {s.version}</motion.span>
          )}
        </AnimatePresence>
      </div>
      <motion.div key={s.status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-stone">Status: {s.status}</motion.div>
      <ul className="mt-5 space-y-2 text-sm">
        {s.items.length === 0 && <li className="text-stone">Belum ada barang.</li>}
        <AnimatePresence initial={false}>
          {s.items.map((it) => (
            <motion.li key={it} layout initial={{ opacity: 0, x: -10, backgroundColor: '#CFE0D9' }} animate={{ opacity: 1, x: 0, backgroundColor: '#FFFFFF' }}
              transition={{ duration: 0.8, ease }} className="rounded-md border border-line px-3 py-2 text-ink">{it}</motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-5 text-sm text-stone">{s.version === 2 ? 'Riwayat: versi 1 tersimpan' : 'Riwayat: belum ada revisi'}</div>
    </div>
  );
}

const STEPS = [
  ['Tautkan akun', 'Buka link undangan dari dashboard. Akun Telegram Anda langsung terhubung ke data bisnis Anda.'],
  ['Tulis perintah seperti biasa', 'Contohnya “pesanan klien 1: tenda 2, kursi 50, 3 hari”.'],
  ['Cek ringkasan, lalu konfirmasi', 'Agen menyusun ringkasan dengan template Anda. Tidak ada yang tersimpan sebelum Anda menekan Konfirmasi.'],
  ['Dashboard dan PDF diperbarui', 'Data tersimpan, PDF versi terbaru dikirim, dan riwayat revisi tetap tercatat.'],
];

function Steps({ active }: { active: number }) {
  return (
    <ol className="space-y-5">
      {STEPS.map(([t, d], i) => (
        <li key={t} className="flex gap-4">
          <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full font-display text-sm font-semibold transition-colors duration-500 ${i <= active ? 'bg-sage text-white' : 'bg-mist text-stone'}`}>{i + 1}</span>
          <div><h3 className="font-semibold text-ink">{t}</h3><p className="mt-1 text-sm leading-relaxed text-stone">{d}</p></div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Desktop: section di-pin; menggulir menjalankan percakapan dan panel dashboard ikut berubah.
 * Mobile / reduced motion: tanpa pin, percakapan diputar otomatis saat terlihat.
 */
export function ChatStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const f = () => setPin(mq.matches && !reduce);
    f(); mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!pin) return;
    const s = Math.min(MESSAGES.length, Math.floor(v * (MESSAGES.length + 1.2)));
    setStep((cur) => Math.max(cur, s)); // cerita hanya maju, tidak mundur
  });

  // Mode tanpa pin: putar otomatis setelah terlihat
  useEffect(() => {
    if (pin || !started) return;
    if (reduce) { setStep(MESSAGES.length); return; }
    if (step >= MESSAGES.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 300 : 1100);
    return () => clearTimeout(t);
  }, [pin, started, step, reduce]);

  const activeStep = step >= 5 ? 3 : step >= 3 ? 2 : step >= 1 ? 1 : 0;

  return (
    <section id="bot" className="bg-mist">
      <div ref={ref} className={pin ? 'h-[230vh]' : ''}>
        <div className={pin ? 'sticky top-0 flex h-screen items-center' : 'py-24'}>
          <motion.div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_22rem_1fr] lg:items-center"
            onViewportEnter={() => setStarted(true)} viewport={{ once: true, amount: 0.3 }}>
            <div>
              <h2 className="h2">Satu bot Telegram untuk seluruh tim</h2>
              <p className="mt-4 max-w-md leading-relaxed text-stone">
                Semua vendor memakai bot Intamio yang sama, tapi data setiap vendor terpisah. Karyawan menautkan akunnya masing-masing, dan aksesnya mengikuti peran yang Anda atur.
              </p>
              <div className="mt-8"><Steps active={activeStep} /></div>
            </div>
            <Phone step={step} />
            <div className="lg:pl-2"><Panel step={step} /><p className="mt-4 text-xs text-stone">Ilustrasi alur kerja, bukan tangkapan layar.</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

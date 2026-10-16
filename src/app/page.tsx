import { ChatStory } from '@/components/ChatStory';
import { Faq } from '@/components/Faq';
import { Hero } from '@/components/Hero';
import { Reveal } from '@/components/Providers';
import { FAQS } from './content';

const APP = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/login';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'halo@intamio.id';
const nav = [['#fitur', 'Fitur'], ['#bot', 'Bot Telegram'], ['#harga', 'Harga'], ['#faq', 'FAQ']];

const problems = [
  ['Pesanan tercecer di chat', 'Detail sewa tersebar di WhatsApp, catatan, dan ingatan, sehingga revisi klien gampang terlewat.', 'Semua pesanan tercatat di satu dashboard, lengkap dengan riwayat setiap revisi.'],
  ['Invoice dibuat manual', 'Setiap perubahan berarti menghitung ulang harga × jumlah × hari, dan itu rawan salah.', 'Total dihitung otomatis dari daftar harga Anda, dan invoice langsung jadi dari pesanan.'],
  ['Kondisi keuangan tidak jelas', 'Sulit melihat berapa yang sudah dibayar dan berapa yang masih tertunda.', 'Laporan pemasukan per bulan menampilkan yang ditagih, lunas, dan belum lunas.'],
  ['Tim lapangan sulit dipantau', 'Kabar pemasangan dan pengembalian barang datang terpisah-pisah.', 'Tim mengirim laporan lapangan dengan foto, dan laporannya langsung masuk ke dashboard.'],
];

const features = [
  ['Pesanan klien', 'Catat barang, jumlah, dan lama sewa. Total otomatis, status jelas, dan versi lama tetap tersimpan.'],
  ['Invoice', 'Buat invoice dari pesanan dengan satu klik, lalu tandai lunas atau belum lunas.'],
  ['Laporan keuangan', 'Ringkasan pemasukan per periode untuk memantau arus kas bisnis Anda.'],
  ['Anggota tim dan peran', 'Owner, Admin, Keuangan, dan Lapangan. Setiap orang hanya melihat yang perlu.'],
  ['Laporan lapangan', 'Laporan teks dan foto dari lokasi acara, terhubung ke pesanan terkait.'],
  ['Agen AI di Telegram', 'Kirim perintah lewat chat, dan dashboard ikut diperbarui. Satu bot dipakai seluruh tim.'],
];

const plans = [
  { name: 'Basic', note: 'Untuk vendor yang baru mulai', featured: false,
    items: ['Contoh: 100 kredit AI per bulan', 'Contoh: hingga 5 anggota tim', 'Semua modul dashboard', 'Agen AI via Telegram', 'Template invoice sendiri', 'Top-up kredit kapan saja'] },
  { name: 'Pro', note: 'Untuk tim yang lebih besar', featured: true,
    items: ['Contoh: 1.500 kredit AI per bulan', 'Contoh: hingga 20 anggota tim', 'Semua fitur Basic', 'Batas kredit per karyawan'] },
];

function Check() {
  return <svg className="mt-1 h-3.5 w-3.5 flex-none text-sage" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>;
}

export default function Home() {
  return (
    <>
      <a href="#utama" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Lewati ke konten</a>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="font-display text-xl font-bold tracking-tight text-ink">intamio</a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">{nav.map(([h, l]) => <a key={h} href={h} className="link">{l}</a>)}</nav>
          <div className="flex gap-2">
            <a href={APP} className="btn-quiet px-4 py-2">Masuk</a>
            <a href="#harga" className="btn hidden px-4 py-2 sm:inline-flex">Mulai Langganan</a>
          </div>
        </div>
      </header>

      <main id="utama">
        <Hero app={APP} />

        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal><h2 className="h2 max-w-xl">Dari catatan yang berantakan ke sistem yang rapi</h2></Reveal>
          <div className="mt-14 divide-y divide-line border-y border-line">
            {problems.map(([t, p, s], i) => (
              <Reveal key={t} delay={i * 0.05} className="grid gap-3 py-7 md:grid-cols-[14rem_1fr_1fr] md:gap-10">
                <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                <p className="leading-relaxed text-stone"><span className="sr-only">Masalah: </span>{p}</p>
                <p className="leading-relaxed text-ink"><span className="mr-2 inline-block rounded bg-sage-soft px-1.5 text-xs font-semibold leading-5 text-sage">Dengan Intamio</span>{s}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="fitur" className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal><h2 className="h2 max-w-xl">Yang dibutuhkan bisnis rental, di satu tempat</h2></Reveal>
          <dl className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 0.06} className="group border-t border-line py-6">
                <dt className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                  <span className="h-2 w-2 rounded-full bg-sage transition-transform duration-300 group-hover:scale-150" aria-hidden />{t}
                </dt>
                <dd className="mt-2 leading-relaxed text-stone">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <ChatStory />

        <section id="harga" className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="max-w-2xl">
            <h2 className="h2">Pilih paket sesuai skala bisnis</h2>
            <p className="mt-4 leading-relaxed text-stone">Setiap paket mendapat jatah kredit AI bulanan. Kalau kurang, top-up kapan saja lewat QRIS, Virtual Account, atau e-wallet.</p>
            <p className="mt-4 inline-block rounded-md bg-[#F3EBD9] px-3 py-1.5 text-sm text-[#6B5420]">Harga dan angka di bawah masih contoh dan belum final.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className={`flex h-full flex-col rounded-2xl p-8 transition duration-300 hover:-translate-y-1 ${p.featured ? 'bg-ink text-paper' : 'bg-white ring-1 ring-line hover:ring-sage/40'}`}>
                  <h3 className={`font-display text-2xl font-semibold ${p.featured ? 'text-paper' : 'text-ink'}`}>{p.name}</h3>
                  <p className={p.featured ? 'text-paper/70' : 'text-stone'}>{p.note}</p>
                  <p className="mt-8">
                    <span className={p.featured ? 'text-paper/70' : 'text-stone'}>Mulai dari </span>
                    <span className="font-display text-4xl font-semibold">Rp…</span>
                    <span className={p.featured ? 'text-paper/70' : 'text-stone'}> per bulan (contoh)</span>
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm">
                    {p.items.map((x) => <li key={x} className="flex gap-2.5">{p.featured ? <span className="mt-1 text-[#8FC2B3]"><Check /></span> : <Check />}{x}</li>)}
                  </ul>
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Langganan Intamio ${p.name}`)}`}
                    className={`mt-10 ${p.featured ? 'inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-sage-soft' : 'btn'}`}>Mulai Langganan</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-3">
            {[['Jatah bulanan', 'Di-reset setiap periode langganan.'], ['Kredit top-up', 'Tidak hangus selama langganan aktif.'], ['Urutan pemakaian', 'Jatah bulanan dipakai lebih dulu, lalu kredit top-up.']].map(([t, d]) => (
              <div key={t}><div className="font-semibold text-ink">{t}</div><div className="mt-1 text-stone">{d}</div></div>
            ))}
          </Reveal>
        </section>

        <section id="faq" className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 lg:grid-cols-[1fr_2fr]">
          <Reveal><h2 className="h2">Pertanyaan yang sering diajukan</h2></Reveal>
          <Reveal><Faq items={FAQS} /></Reveal>
        </section>

        <section id="kontak" className="px-5 pb-24">
          <Reveal className="mx-auto max-w-6xl rounded-3xl bg-sage px-6 py-16 text-white sm:px-14">
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-[2.6rem]">Siap merapikan bisnis sewa Anda?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/85">Hubungi kami untuk mulai berlangganan atau minta demo. Kami bantu menyiapkan template invoice dan data produk Anda.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white">Hubungi kami</a>
              <a href={APP} className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/50 transition hover:bg-white/10">Masuk</a>
            </div>
            <p className="mt-6 text-sm text-white/80">{CONTACT_EMAIL}</p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
          <div><span className="font-display font-bold text-ink">intamio</span>, software manajemen bisnis rental dan event</div>
          <nav className="flex flex-wrap gap-6">{nav.map(([h, l]) => <a key={h} href={h} className="link">{l}</a>)}<a href={APP} className="link">Masuk</a></nav>
          <div>© {new Date().getFullYear()} Intamio</div>
        </div>
      </footer>
    </>
  );
}

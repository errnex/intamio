const APP = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/login';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'halo@intamio.id';

const nav = [['#fitur', 'Fitur'], ['#bot', 'Bot Telegram'], ['#harga', 'Harga'], ['#faq', 'FAQ']];

const problems = [
  ['Pesanan tercecer di chat', 'Detail sewa tersebar di WhatsApp, catatan, dan ingatan. Revisi klien gampang terlewat.', 'Semua pesanan tercatat rapi di satu dashboard, lengkap dengan riwayat setiap revisi.'],
  ['Invoice dibuat manual', 'Hitung ulang harga × jumlah × hari setiap ada perubahan memakan waktu dan rawan salah.', 'Total dihitung otomatis dari daftar harga Anda, invoice langsung jadi dari pesanan.'],
  ['Tidak tahu kondisi keuangan', 'Sulit melihat berapa yang sudah dibayar dan berapa yang masih tertunda.', 'Laporan pemasukan per bulan: ditagih, lunas, dan belum lunas dalam sekali lihat.'],
  ['Tim lapangan sulit dipantau', 'Kabar pemasangan dan pengembalian barang datang terpisah-pisah.', 'Tim kirim laporan lapangan plus foto, langsung masuk ke dashboard.'],
];

const features = [
  ['📋', 'Pesanan Klien', 'Catat barang, jumlah, dan lama sewa. Total otomatis, status jelas, dan versi lama tetap tersimpan.'],
  ['🧾', 'Invoice', 'Buat invoice dari pesanan dengan satu klik, lalu tandai lunas atau belum lunas.'],
  ['📊', 'Laporan Keuangan', 'Ringkasan pemasukan per periode untuk memantau arus kas bisnis Anda.'],
  ['👥', 'Anggota Tim & Peran', 'Owner, Admin, Keuangan, dan Lapangan. Tiap orang hanya melihat yang perlu.'],
  ['📸', 'Laporan Lapangan', 'Laporan teks dan foto dari lokasi acara, terhubung ke pesanan terkait.'],
  ['🤖', 'Agen AI di Telegram', 'Kirim perintah lewat chat, dashboard ikut ter-update. Satu bot dipakai seluruh tim.'],
];

const steps = [
  ['Tautkan akun', 'Buka link undangan dari dashboard. Akun Telegram Anda langsung terhubung ke data bisnis Anda.'],
  ['Kirim perintah biasa', 'Tulis seperti ngobrol: “pesanan klien 1: tenda 2, kursi 50, 3 hari”.'],
  ['Cek ringkasan & konfirmasi', 'Agen menampilkan ringkasan memakai template Anda. Tidak ada yang tersimpan sebelum Anda menekan Konfirmasi.'],
  ['Dashboard & PDF ter-update', 'Data tersimpan, PDF versi terbaru dikirim, dan riwayat revisi tetap tercatat.'],
];

const plans = [
  { name: 'Basic', price: 'Rp…', note: 'Untuk vendor yang baru mulai', credits: 'Contoh: 100 kredit AI / bulan', members: 'Contoh: hingga 5 anggota tim', featured: false,
    items: ['Semua modul dashboard', 'Agen AI via Telegram', 'Template invoice sendiri', 'Top-up kredit kapan saja'] },
  { name: 'Pro', price: 'Rp…', note: 'Untuk tim yang lebih besar', credits: 'Contoh: 1.500 kredit AI / bulan', members: 'Contoh: hingga 20 anggota tim', featured: true,
    items: ['Semua fitur Basic', 'Kredit AI lebih banyak', 'Lebih banyak anggota tim', 'Batas kredit per karyawan'] },
];

const faqs = [
  ['Apa itu kredit AI?', 'Setiap perintah ke agen AI memakai kredit sesuai beratnya. Pertanyaan ringan memakai sedikit kredit, sedangkan membuat invoice atau laporan memakai lebih banyak. Sisa kredit selalu terlihat di dashboard.'],
  ['Kalau kredit bulanan tidak habis, apakah hangus?', 'Jatah kredit bulanan dari paket di-reset setiap periode. Kredit hasil top-up tidak hangus selama langganan aktif, dan jatah bulanan selalu dipakai lebih dulu.'],
  ['Bagaimana cara top-up kredit?', 'Lewat menu Top Up di dashboard. Pembayaran bisa memakai QRIS, Virtual Account, atau e-wallet, dan kredit masuk otomatis setelah pembayaran berhasil.'],
  ['Apakah seluruh karyawan bisa memakai bot yang sama?', 'Bisa. Setiap karyawan menautkan akun Telegram-nya sendiri, dan aksesnya mengikuti peran yang Anda atur. Dashboard mencatat siapa melakukan apa.'],
  ['Apakah data bisnis saya terpisah dari vendor lain?', 'Ya. Setiap vendor punya ruang data sendiri. Vendor lain tidak bisa melihat atau mengubah data Anda, termasuk lewat bot.'],
  ['Apakah AI bisa salah mengubah data?', 'Sebelum menyimpan, agen selalu menampilkan ringkasan perubahan dan menunggu Anda menekan Konfirmasi. Versi lama pesanan juga tetap tersimpan.'],
  ['Perlu memasang aplikasi?', 'Tidak. Dashboard dibuka lewat browser, dan agen AI cukup lewat aplikasi Telegram yang sudah Anda punya.'],
];

function Check() {
  return <svg className="mt-0.5 h-4 w-4 flex-none text-brand-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>;
}

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed shadow-sm ${me ? 'rounded-br-md bg-[#d9fdd3] text-slate-800' : 'rounded-bl-md bg-white text-slate-800'}`}>{children}</div>
    </div>
  );
}

/** Ilustrasi percakapan bot Telegram (HTML/CSS, bukan tangkapan layar asli). */
function ChatMock() {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border-8 border-slate-900 bg-slate-900 shadow-2xl" role="img" aria-label="Ilustrasi percakapan dengan bot Telegram Intamio">
      <div className="flex items-center gap-3 bg-[#517da2] px-4 py-3 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 font-bold">I</div>
        <div><div className="text-sm font-semibold">Intamio Bot</div><div className="text-xs text-white/70">bot</div></div>
      </div>
      <div className="space-y-2.5 bg-[#e6ebee] p-3" style={{ backgroundImage: 'radial-gradient(#d3dbe0 1px, transparent 1px)', backgroundSize: '14px 14px' }}>
        <Bubble me>Pesanan klien PT Maju: tenda 2, kursi 50, mulai 22 Okt, 3 hari</Bubble>
        <Bubble>
          <div className="font-semibold">Ringkasan pesanan baru</div>
          <div className="mt-1 text-slate-600">Klien: PT Maju · 3 hari<br />• Tenda 5x5 × 2<br />• Kursi × 50</div>
          <div className="mt-1 font-semibold">Total: Rp…</div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <span className="rounded-lg bg-brand-500 py-1.5 text-center text-xs font-semibold text-white">✅ Konfirmasi</span>
            <span className="rounded-lg bg-slate-100 py-1.5 text-center text-xs font-semibold text-slate-600">✏️ Ubah</span>
          </div>
        </Bubble>
        <Bubble me>Klien PT Maju revisi, tambah sound system 1</Bubble>
        <Bubble>
          Pesanan diperbarui ke <b>versi 2</b>. Total dihitung ulang dan versi lama tetap tersimpan.
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 p-2">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-red-500 text-[10px] font-bold text-white">PDF</span>
            <span className="text-xs"><b>Invoice-PT-Maju-v2.pdf</b><br /><span className="text-slate-500">Template vendor Anda</span></span>
          </div>
        </Bubble>
        <div className="pt-1 text-center text-[11px] text-slate-500">Dashboard ter-update otomatis · sisa kredit terlihat</div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="text-xl font-bold text-brand-600">Intamio</a>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            {nav.map(([h, l]) => <a key={h} href={h} className="hover:text-slate-900">{l}</a>)}
          </nav>
          <div className="flex gap-2">
            <a href={APP} className="btn-outline px-4 py-2">Masuk</a>
            <a href="#harga" className="btn hidden px-4 py-2 sm:inline-flex">Mulai Langganan</a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
          <div className="section grid items-center gap-12 pt-16 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-500/20">Untuk vendor rental alat &amp; event</span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Kelola bisnis sewa Anda <span className="text-brand-600">cukup lewat chat.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                Pesanan klien, invoice, laporan keuangan, tim, dan laporan lapangan dalam satu dashboard. Tinggal kirim perintah ke agen AI di Telegram, dan dashboard Anda ikut ter-update.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#harga" className="btn">Mulai Langganan</a>
                <a href={APP} className="btn-outline">Masuk ke Dashboard</a>
              </div>
              <p className="mt-4 text-sm text-slate-500">Tanpa instal aplikasi. Cukup browser dan Telegram.</p>
            </div>
            <ChatMock />
          </div>
        </section>

        {/* Masalah → Solusi */}
        <section className="section">
          <div className="max-w-2xl"><p className="eyebrow">Masalah → Solusi</p><h2 className="h2">Dari catatan berantakan ke sistem yang rapi</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {problems.map(([t, p, s]) => (
              <div key={t} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900">{t}</h3>
                <p className="mt-2 text-sm text-slate-500"><span className="font-medium text-red-500">Masalah: </span>{p}</p>
                <p className="mt-3 text-sm text-slate-700"><span className="font-medium text-green-600">Dengan Intamio: </span>{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fitur */}
        <section id="fitur" className="bg-slate-50">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Fitur</p><h2 className="h2">Semua yang dibutuhkan bisnis rental</h2></div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(([i, t, d]) => (
                <div key={t} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">{i}</div>
                  <h3 className="mt-4 font-semibold text-slate-900">{t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cara kerja bot */}
        <section id="bot" className="section">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1"><ChatMock /></div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow">Cara kerja bot Telegram</p>
              <h2 className="h2">Satu bot untuk seluruh tim Anda</h2>
              <p className="mt-4 text-slate-600">Semua vendor memakai satu bot Intamio, tapi data Anda tetap terpisah. Karyawan menautkan akunnya masing-masing, dan aksesnya mengikuti peran yang Anda atur.</p>
              <ol className="mt-8 space-y-6">
                {steps.map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{i + 1}</span>
                    <div><h3 className="font-semibold text-slate-900">{t}</h3><p className="mt-1 text-sm text-slate-600">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Harga */}
        <section id="harga" className="bg-slate-50">
          <div className="section">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">Harga paket</p><h2 className="h2">Pilih paket sesuai skala bisnis</h2>
              <p className="mt-4 text-slate-600">Setiap paket mendapat jatah kredit AI bulanan. Butuh lebih? Top-up kapan saja lewat QRIS, Virtual Account, atau e-wallet.</p>
              <p className="mx-auto mt-4 inline-block rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">Harga dan angka di bawah masih contoh dan belum final.</p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
              {plans.map((p) => (
                <div key={p.name} className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${p.featured ? 'ring-2 ring-brand-500' : 'ring-1 ring-slate-200'}`}>
                  {p.featured && <span className="absolute -top-3 left-8 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">Untuk tim besar</span>}
                  <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.note}</p>
                  <p className="mt-6"><span className="text-sm text-slate-500">Mulai dari </span><span className="text-4xl font-bold text-slate-900">{p.price}</span><span className="text-sm text-slate-500"> /bulan</span></p>
                  <p className="text-xs font-medium text-amber-600">(contoh)</p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {[p.credits, p.members, ...p.items].map((x) => <li key={x} className="flex gap-2"><Check />{x}</li>)}
                  </ul>
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Langganan Intamio ${p.name}`)}`} className={`mt-8 ${p.featured ? 'btn' : 'btn-outline'}`}>Mulai Langganan</a>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-6 text-sm text-slate-600 ring-1 ring-slate-200">
              <h3 className="font-semibold text-slate-900">Tentang kredit AI</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                <li className="flex gap-2"><Check />Jatah bulanan di-reset setiap periode</li>
                <li className="flex gap-2"><Check />Kredit top-up tidak hangus selama berlangganan</li>
                <li className="flex gap-2"><Check />Jatah bulanan dipakai lebih dulu</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section max-w-3xl">
          <div className="text-center"><p className="eyebrow">FAQ</p><h2 className="h2">Pertanyaan yang sering diajukan</h2></div>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {faqs.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
                  {q}<span className="ml-4 text-slate-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Kontak / CTA */}
        <section id="kontak" className="px-5 pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-brand-600 px-6 py-14 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Siap merapikan bisnis sewa Anda?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Hubungi kami untuk mulai berlangganan atau minta demo. Kami bantu siapkan template invoice dan data produk Anda.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">Hubungi Kami</a>
              <a href={APP} className="inline-flex items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Masuk</a>
            </div>
            <p className="mt-6 text-sm text-white/70">{CONTACT_EMAIL}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row">
          <div><span className="font-bold text-brand-600">Intamio</span> · Software manajemen bisnis rental &amp; event</div>
          <nav className="flex gap-6">{nav.map(([h, l]) => <a key={h} href={h} className="hover:text-slate-900">{l}</a>)}<a href={APP} className="hover:text-slate-900">Masuk</a></nav>
          <div>© {new Date().getFullYear()} Intamio</div>
        </div>
      </footer>
    </>
  );
}

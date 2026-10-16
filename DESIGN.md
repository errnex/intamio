# Intamio site — design plan (mengikuti skill `frontend-design`, lihat /.skills/frontend-design)

Subjek: software untuk vendor rental alat & event. Audiens: pemilik usaha sewa tenda, kursi, sound system, dan timnya.
Tugas utama halaman: menunjukkan bahwa chat di Telegram langsung mengubah pesanan, invoice, dan dashboard.

## Token
| Nama | Hex | Peran |
|---|---|---|
| Paper | #F4F6F3 | latar utama (off-white dingin, bukan krem) |
| Mist  | #E3EBE7 | permukaan sekunder, latar section |
| Line  | #CFD9D4 | garis pemisah |
| Ink   | #1C2826 | teks utama (kontras 14.6:1 di Paper) |
| Stone | #52605C | teks sekunder (6.1:1 di Paper) |
| Sage  | #3B6B60 | aksen, tombol (putih di atasnya 6.0:1) |
| Sage soft | #CFE0D9 | sorotan lembut, gelembung chat pengguna |

Tipe: Bricolage Grotesque (judul, sedikit "berkarakter", lebar optik) + Instrument Sans (teks). Skala ~1.25, judul rapat (-0.02em).

Layout: rata kiri di seluruh halaman. Hero = judul besar + "nota sewa" kertas (bahasa visual rental: slip pesanan, stempel versi).
Satu momen yang diingat: section Bot yang di-pin — saat menggulir, percakapan Telegram berjalan dan panel pesanan di sebelahnya
ikut berubah (v1 → v2, total dihitung ulang). Elemen lain sengaja tenang.

## Review terhadap default generik (yang diubah)
- Kartu fitur identik → diganti daftar dua kolom dengan garis pemisah.
- Eyebrow huruf kapital di atas tiap judul → dihapus; judul berdiri sendiri.
- Aksen satu kata berwarna di headline → dihapus.
- Fade-up di setiap section → reveal hanya halus (opacity + 12px) untuk blok konten; animasi utama hanya di hero (sekali) dan cerita chat.
- Pemisah titik tengah ("A · B") → dihindari.
- Penomoran langkah dipertahankan karena memang urutan.

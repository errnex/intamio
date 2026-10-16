import './globals.css';
import type { Metadata, Viewport } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
const title = 'Intamio — Software Manajemen Bisnis Rental & Event dengan Agen AI Telegram';
const description =
  'Kelola pesanan klien, invoice, laporan keuangan, tim, dan laporan lapangan dalam satu dashboard. Update semuanya cukup lewat chat Telegram dengan agen AI Intamio.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: title, template: '%s | Intamio' },
  description,
  keywords: ['software rental', 'aplikasi sewa alat', 'manajemen event', 'invoice otomatis', 'bot telegram AI', 'SaaS vendor', 'Intamio'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'id_ID', url: '/', siteName: 'Intamio', title, description },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#2563eb', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Intamio',
    applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Telegram', description, inLanguage: 'id',
  };
  return (
    <html lang="id">
      <body className="bg-white text-slate-700 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

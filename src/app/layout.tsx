import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { FAQS } from './content';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

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
export const viewport: Viewport = { themeColor: '#3B6B60', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Intamio',
    applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Telegram', description, inLanguage: 'id',
  };
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqLd]) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

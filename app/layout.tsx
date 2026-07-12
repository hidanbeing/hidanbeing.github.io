import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} · ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline + ' ' + profile.summary,
  keywords: ['이단비', 'Danbee Lee', '백엔드', '시스템 운영', '생성형 AI', 'RAG', 'Java', 'Spring Boot', '포트폴리오'],
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: profile.siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} · ${profile.title}`,
    description: profile.tagline,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${profile.name} 포트폴리오` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} · ${profile.title}`,
    description: profile.tagline,
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
};

/** 페인트 전에 테마를 적용해 깜빡임(FOUC)을 막는다. */
const themeScript = `
(function(){try{
  var s=localStorage.getItem('theme');
  var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(d)document.documentElement.classList.add('dark');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

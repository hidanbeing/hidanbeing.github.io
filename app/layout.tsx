import type { Metadata } from 'next';
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { profile } from '@/data/profile';

/** 본문·제목. Pretendard 대신 Plex — 엔지니어링 조직 목소리로 그려진 서체. */
const plexKr = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-kr',
  display: 'swap',
});

/** 라벨·수치. 판독값은 전부 여기로. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

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
    <html lang="ko" className={`${plexKr.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

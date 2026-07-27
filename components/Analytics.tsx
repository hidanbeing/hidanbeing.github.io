'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { analytics } from '@/data/profile';

declare global {
  interface Window {
    goatcounter?: { count: (v: { path: string; title?: string; event?: boolean }) => void };
  }
}

/**
 * GoatCounter 방문 집계.
 * 쿠키를 쓰지 않아 동의 배너가 필요 없고, localhost는 기본적으로 집계되지 않는다.
 *
 * no_onload를 켜서 스크립트의 자동 집계를 끄고 직접 센다.
 * Next.js는 클라이언트 라우팅이라 페이지 이동 시 스크립트가 다시 뜨지 않기 때문에,
 * 자동 집계에 맡기면 첫 진입만 잡히고 이후 이동은 전부 누락된다.
 */
export default function Analytics() {
  const code = analytics.goatcounter;
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;
    window.goatcounter?.count({ path: pathname });
  }, [ready, pathname]);

  // 코드를 안 넣었으면 스크립트 자체를 로드하지 않는다
  if (!code) return null;

  return (
    <Script
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      data-goatcounter-settings='{"no_onload":true}'
      onLoad={() => setReady(true)}
    />
  );
}

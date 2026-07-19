'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GA4_ID, initAnalytics, pageView } from '@/lib/analytics';
import { captureAttribution } from '@/lib/attribution';

/**
 * Mount once in the root layout. Boots PostHog, fires page_view + UTM capture
 * on every route change, renders the GA4 tag only when its env id is set.
 *
 * window.location.search is read directly (not useSearchParams) to avoid a
 * Suspense boundary requirement.
 */
export function AnalyticsBinder() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    const search = window.location.search;
    captureAttribution(search);
    pageView(pathname, search);
  }, [pathname]);

  if (!GA4_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            var stored = localStorage.getItem('soma_consent');
            if (stored) gtag('consent', 'update', JSON.parse(stored));
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

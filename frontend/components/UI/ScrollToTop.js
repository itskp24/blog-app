'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop() {
  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

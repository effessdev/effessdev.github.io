"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; title?: string }) => void;
    };
  }
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    // 1. Skip tracking in local development
    if (process.env.NODE_ENV === "development") return;

    // 2. Skip first render (count.js handles the initial page load automatically)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Record current path so initial anchor jumps on same page are ignored
      const clean =
        pathname.length > 1 && pathname.endsWith("/")
          ? pathname.slice(0, -1)
          : pathname;
      lastTrackedPath.current =
        clean + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      return;
    }

    // 3. Normalize trailing slash
    const cleanPath =
      pathname.length > 1 && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    const queryString = searchParams.toString();
    const url = cleanPath + (queryString ? `?${queryString}` : "");

    // 4. Ignore duplicate consecutive tracking requests (e.g., anchor/hash changes)
    if (url === lastTrackedPath.current) return;

    lastTrackedPath.current = url;

    // 5. Track with retry fallback in case count.js is still loading
    const track = () => {
      if (window.goatcounter?.count) {
        window.goatcounter.count({ path: url });
      } else {
        setTimeout(() => window.goatcounter?.count?.({ path: url }), 150);
      }
    };

    track();
  }, [pathname, searchParams]);

  return null;
}

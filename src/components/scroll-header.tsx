"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hides the header on scroll down, shows it on scroll up (always visible
 * near the top). The wrapper is transparent — only the floating bar slides,
 * so the hero gradient never gets a hard edge cutting through it.
 */
export default function ScrollHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 50) setIsVisible(true);
      else if (y > lastY.current + 10) setIsVisible(false);
      else if (y < lastY.current - 40) setIsVisible(true);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-3 transition-transform duration-300 ease-in-out will-change-transform sm:px-6 lg:px-8",
        isVisible ? "translate-y-0" : "-translate-y-[130%]",
      )}
    >
      {children}
    </header>
  );
}

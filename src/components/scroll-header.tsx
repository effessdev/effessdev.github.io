"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function ScrollHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const scrollAnchorY = useRef(0);
  const scrollDirection = useRef("up");
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // 1. Always show at the very top (within 50px)
          if (currentScrollY <= 50) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // 2. Track direction changes and set the anchor point
          if (currentScrollY > lastScrollY.current) {
            // User started scrolling down
            if (scrollDirection.current !== "down") {
              scrollDirection.current = "down";
              scrollAnchorY.current = lastScrollY.current;
            }

            // Hide after scrolling down past the 10px threshold
            if (currentScrollY - scrollAnchorY.current > 10) {
              setIsVisible(false);
            }
          } else if (currentScrollY < lastScrollY.current) {
            // User started scrolling up
            if (scrollDirection.current !== "up") {
              scrollDirection.current = "up";
              scrollAnchorY.current = lastScrollY.current;
            }

            // Show only after scrolling up continuously for 40px
            if (scrollAnchorY.current - currentScrollY > 40) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        // Fixed so it floats over the hero glow. Transparent wrapper with
        // padding around the bar — the translucent, max-width bar itself
        // (SiteHeader) is what slides, so the gradient never gets a hard
        // full-bleed edge cutting through it as the navbar appears/vanishes.
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-3 transition-transform duration-300 ease-in-out will-change-transform sm:px-6 lg:px-8",
        isVisible ? "translate-y-0" : "-translate-y-[130%]",
      )}
    >
      {children}
    </header>
  );
}

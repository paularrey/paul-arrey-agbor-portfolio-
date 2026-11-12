"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import Lenis from "lenis";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const header = document.querySelector("header");
    const offset = -((header?.offsetHeight ?? 64) + 8);

    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "group rounded-lg border border-hairline bg-surface text-foreground shadow-none",
            title: "text-sm font-medium",
            description: "text-xs text-muted-foreground",
          },
        }}
      />
    </MotionConfig>
  );
}

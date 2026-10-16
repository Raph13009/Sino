"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { setLenisInstance } from "@/lib/lenis-instance";
import "lenis/dist/lenis.css";

function LenisInstanceBridge() {
  const lenis = useLenis();

  useEffect(() => {
    setLenisInstance(lenis ?? null);
    return () => setLenisInstance(null);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        anchors: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        wheelMultiplier: 0.95,
      }}
    >
      <LenisInstanceBridge />
      {children}
    </ReactLenis>
  );
}

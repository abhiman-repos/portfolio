"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertia scrolling for the whole page. Lenis drives the *native* scroll
 * position, so the video component simply reads window scroll every frame.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: true });
    let id = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}

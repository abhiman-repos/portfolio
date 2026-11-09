"use client";

import { useEffect, useRef, useState } from "react";
import "./intro.css";
import { intro } from "@/data/intro";
import { getVideoState, startVideoLoad } from "@/lib/videoStore";
import DodgeField from "./DodgeField";

const MIN_MS = 4500; // shortest time the welcome screen stays up
const MIN_MS_REDUCED = 1800; // for visitors who prefer reduced motion
const MAX_MS = 15000; // never trap anyone on a very slow connection
const EXIT_MS = 950; // must match the CSS transition
const SEEN_KEY = "intro-seen";

type Phase = "intro" | "exit" | "done";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function Intro() {
  const [phase, setPhase] = useState<Phase>("intro");
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    // Start downloading the video right away, whatever happens next.
    startVideoLoad();

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;
    const main = document.getElementById("top");
    const html = document.documentElement;
    html.dataset.introPhase = "intro";

    const unlock = () => {
      html.style.overflow = "";
      main?.removeAttribute("inert");
    };

    // Returning visitors in the same session skip straight to the page.
    if (seen) {
      html.dataset.introPhase = "done";
      raf = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(raf);
    }

    html.style.overflow = "hidden";
    main?.setAttribute("inert", "");

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      unlock();
      html.dataset.introPhase = "exit";
      setPhase("exit");
      exitTimer = setTimeout(() => {
        html.dataset.introPhase = "done";
        setPhase("done");
      }, EXIT_MS);
    };
    finishRef.current = finish;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minMs = reduce ? MIN_MS_REDUCED : MIN_MS;
    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      // The bar only reaches 100% when BOTH the minimum time has passed
      // and the video has really finished downloading.
      const p = Math.min(clamp(elapsed / minMs), getVideoState().progress);

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      if (countRef.current) {
        const percent = String(Math.round(p * 100)).padStart(3, "0");
        countRef.current.textContent = `${percent}%`;
      }

      if (p >= 1 || elapsed > MAX_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (exitTimer) clearTimeout(exitTimer);
      unlock();
    };
  }, []);

  if (phase === "done") return null;

  const words = intro.name.split(" ");
  const nameStart = 0.35;

  return (
    <div
      className="intro"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome, ${intro.name}'s portfolio`}
    >
      <p className="intro__greeting intro__mask">
        <span className="intro__rise" style={{ ["--d" as string]: "0.2s" }}>
          {intro.greeting}
        </span>
      </p>

      <div>
        <h1 className="intro__name" aria-label={intro.name}>
          {words.map((w, i) => (
            <span key={w + i} className="intro__mask" aria-hidden="true">
              <span
                className="intro__rise"
                style={{ ["--d" as string]: `${nameStart + i * 0.18}s` }}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <dl className="intro__rows">
          {intro.rows.map((r, i) => (
            <div
              key={r.label}
              className="intro__row"
              style={{ ["--d" as string]: `${1.5 + i * 0.4}s` }}
            >
              <dt>{r.label}</dt>
              <dd className={r.marker ? "intro__marker" : undefined}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="intro__bottom">
        <div className="intro__progress">
          <div className="intro__label">
            <span>Preparing the experience</span>
            <span ref={countRef} className="intro__count">
              0%
            </span>
          </div>
          <div className="intro__meter" aria-hidden="true">
            <span ref={fillRef} className="intro__fill" />
          </div>
        </div>
        <DodgeField
          inkColor="#f5f5f5"
          contrastColor="#18181b"
          fieldHeight={100}
          reach={110}
          radius={260}
          falloff={1.2}
          fleeDuration={100}
          returnDuration={700}
          returnBounce={0.05}
          axis="both"
          wall="bounce"
          patience={5}
          taunts={[
            "Skip intro",
            "Too slow 😏",
            "Missed me!",
            "Not today 😂",
            "Almost got me!",
            "Okay, you win 🏳️",
          ]}
          onRelent={() => console.log("The button surrendered!")}
          className="intro__skip-field"
          style={{ width: "280px", marginLeft: "auto" }}
        >
          {({ dodges, gave }) => (
            <button
              type="button"
              className="intro__skip"
              onClick={() => {
                if (gave) {
                  finishRef.current();
                }
              }}
              aria-label="Skip intro"
            >
              {gave
                ? "Okay"
                : dodges > 0
                  ? `Catch me! (${dodges})`
                  : "Skip intro"}
            </button>
          )}
        </DodgeField>
      </div>
    </div>
  );
}

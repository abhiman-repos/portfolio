"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/data/site";

const VIDEO_SRC = "/video/portfolio-scrub.mp4";
const POSTER_SRC = "/video/poster.jpg";
const FALLBACK_DURATION = 10;
const FADE = 0.035; // how much scroll progress a chapter takes to fade in/out

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function ScrollVideoHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const loadRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let current = 0;
    let lastSet = -1;
    let raf = 0;

    /* ---------- 1. Load the whole video into memory ----------
       Seeking inside fully-buffered data is instant, which is what makes
       scroll-scrubbing smooth. If anything fails we fall back to a normal src. */
    const abort = new AbortController();
    let objectUrl: string | null = null;

    const setLoad = (p: number, done = false) => {
      const el = loadRef.current;
      if (!el) return;
      el.style.transform = `scaleX(${p})`;
      if (done) el.parentElement?.setAttribute("data-done", "true");
    };

    (async () => {
      try {
        const res = await fetch(VIDEO_SRC, { signal: abort.signal });
        if (!res.ok || !res.body) throw new Error("bad response");
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const parts: BlobPart[] = [];
        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          parts.push(value as BlobPart);
          received += value.length;
          if (total) setLoad(received / total);
        }
        objectUrl = URL.createObjectURL(new Blob(parts, { type: "video/mp4" }));
        video.addEventListener(
          "error",
          () => {
            console.error("Blob video failed, falling back to direct src", video.error);
            video.src = VIDEO_SRC;
          },
          { once: true },
        );
        video.src = objectUrl;
        setLoad(1, true);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Video preload failed, using direct src:", err);
        video.src = VIDEO_SRC;
        setLoad(1, true);
      }
    })();

    /* iOS Safari only allows seeking after the video has been "played" once. */
    const prime = () => {
      video
        .play()
        .then(() => {
          video.pause();
          lastSet = -1; // force the next frame to seek to the right time
        })
        .catch(() => {});
    };
    video.addEventListener("loadeddata", prime, { once: true });
    window.addEventListener("touchstart", prime, { once: true, passive: true });

    /* ---------- 2. Scroll → video time + chapter text ---------- */
    const tick = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const target = clamp(-rect.top / scrollable);

      // A little easing on top of Lenis so the video never "steps".
      current = reduceMotion ? target : current + (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0004) current = target;

      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : FALLBACK_DURATION;
      const time = Math.min(current * duration, duration - 0.001);
      const settled = current === target;
      if (
        video.readyState >= 2 &&
        !video.seeking &&
        Math.abs(time - lastSet) > (settled ? 0.0005 : 1 / 120)
      ) {
        video.currentTime = time;
        lastSet = time;
      }

      chapters.forEach((c, i) => {
        const el = chapterRefs.current[i];
        if (!el) return;
        const fadeIn = smooth(clamp((current - c.start) / FADE));
        const fadeOut = c.hold
          ? 1
          : 1 - smooth(clamp((current - (c.end - FADE)) / FADE));
        const o = Math.min(fadeIn, fadeOut);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 20}px, 0)`;
        const active = o > 0.5;
        el.dataset.active = active ? "true" : "false";
        if (c.actions) el.toggleAttribute("inert", !active);
      });

      if (railRef.current) railRef.current.style.transform = `scaleY(${current})`;
      if (hintRef.current)
        hintRef.current.style.opacity = String(1 - clamp(current / 0.05));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      abort.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      video.removeEventListener("loadeddata", prime);
      window.removeEventListener("touchstart", prime);
    };
  }, []);

  return (
    <section ref={trackRef} className="scrub" aria-label="Introduction">
      <div className="scrub__stage">
        <video
          ref={videoRef}
          className="scrub__video"
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />

        <div className="loadbar" aria-hidden="true">
          <span ref={loadRef} className="loadbar__fill" />
        </div>

        {chapters.map((c, i) => {
          const Heading = c.h1 ? "h1" : "h2";
          return (
            <div
              key={c.id}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className={`chapter chapter--${c.side}`}
              style={{ opacity: c.start === 0 ? 1 : 0 }}
            >
              <div className="chapter__body">
                <Heading
                  className={c.h1 ? "chapter__title chapter__title--name" : "chapter__title"}
                >
                  {c.title}
                </Heading>
                {c.body && <p className="chapter__text">{c.body}</p>}
                {c.actions && (
                  <div className="chapter__actions">
                    <a className="btn btn--solid" href="#work">
                      See my work
                    </a>
                    <a className="btn btn--line" href="#contact">
                      Get in touch
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={hintRef} className="hint" aria-hidden="true">
          <span>Keep scrolling</span>
          <i />
        </div>

        <div className="rail" aria-hidden="true">
          <span ref={railRef} className="rail__fill" />
        </div>
      </div>
    </section>
  );
}
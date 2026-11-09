"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TextLine = { left: number; right: number; top: number; bottom: number };

const cursorColors = ["#ff4d8d", "#ff9f1c", "#ffe14a", "#40d9a2", "#31c8ff", "#6d8cff", "#b778ff", "#ff6b4a", "#55e5df"];

export function BuildFrame() {
  return (
    <span className="build-frame" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <rect x="0.6" y="0.6" width="98.8" height="98.8" rx="1.2" pathLength="1000" />
      </svg>
    </span>
  );
}

function readTextLines(target: HTMLElement): TextLine[] {
  const range = document.createRange();
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  const rows = new Map<number, TextLine>();
  let node = walker.nextNode();

  while (node) {
    if (
      node.textContent?.trim() &&
      !(node.parentElement?.closest(".build-pointer"))
    ) {
      range.selectNodeContents(node);
      for (const rect of Array.from(range.getClientRects())) {
        if (rect.width < 1 || rect.height < 1) continue;
        const row = Math.round(rect.top / 3) * 3;
        const existing = rows.get(row);
        if (existing) {
          existing.left = Math.min(existing.left, rect.left);
          existing.right = Math.max(existing.right, rect.right);
          existing.top = Math.min(existing.top, rect.top);
          existing.bottom = Math.max(existing.bottom, rect.bottom);
        } else {
          rows.set(row, {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
          });
        }
      }
    }
    node = walker.nextNode();
  }

  return Array.from(rows.values()).sort((a, b) => a.top - b.top);
}

function readTextLength(target: HTMLElement) {
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  let length = 0;
  let node = walker.nextNode();
  while (node) {
    if (!node.parentElement?.closest(".build-pointer")) length += node.textContent?.length || 0;
    node = walker.nextNode();
  }
  return length;
}

function lineTravelFrames(lines: TextLine[], parent: HTMLElement) {
  const parentRect = parent.getBoundingClientRect();
  const points = lines.flatMap((line) => [
    { x: line.left - parentRect.left - 2, y: (line.top + line.bottom) / 2 - parentRect.top - 12 },
    { x: line.right - parentRect.left, y: (line.top + line.bottom) / 2 - parentRect.top - 12 },
  ]);
  if (!points.length) points.push({ x: 0, y: 0 }, { x: 80, y: 0 });

  const first = points[0];
  const frames: Keyframe[] = points.map((point, index) => ({
    offset: index / Math.max(1, points.length - 1),
    transform: `translate3d(${point.x - first.x}px, ${point.y - first.y}px, 0)`,
    opacity: 1,
    easing: "linear",
  }));
  frames.unshift({ offset: 0, transform: "translate3d(0,0,0)", opacity: 1 });
  frames[frames.length - 1] = { ...frames[frames.length - 1], opacity: 0 };
  return { first, frames };
}

function writeWithCursor(cursor: HTMLElement, parent: HTMLElement, target: HTMLElement) {
  const lines = readTextLines(target);
  const characterCount = readTextLength(target);
  const duration = Math.max(1250, Math.min(2800, characterCount * 22 || 1500));
  const { first, frames } = lineTravelFrames(lines, parent);
  cursor.style.offsetPath = "none";
  cursor.style.offsetDistance = "0%";
  cursor.style.left = `${first.x}px`;
  cursor.style.top = `${first.y}px`;
  cursor.style.transform = "translate3d(0,0,0)";
  cursor.style.opacity = "1";
  target.style.setProperty("--write-duration", `${duration}ms`);
  target.style.setProperty("--write-steps", String(Math.max(12, characterCount)));
  target.dataset.writing = "true";
  return cursor.animate(frames, {
    duration,
    easing: "linear",
    fill: "forwards",
  });
}

async function buildPointer(cursor: HTMLElement) {
  const parent = cursor.parentElement;
  const action = cursor.dataset.buildAction;
  if (!parent || !action) return;

  const delay = Number(cursor.dataset.buildDelay || 0);
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  if (!cursor.isConnected) return;

  if (action === "type") {
    const animation = writeWithCursor(cursor, parent, parent);
    await animation.finished.catch(() => undefined);
  } else {
    parent.dataset.frame = "true";
    cursor.style.left = "0px";
    cursor.style.top = "0px";
    cursor.style.transform = "none";
    cursor.style.offsetPath = "inset(3px round 4px)";
    cursor.style.offsetRotate = "0deg";

    const trace = cursor.animate(
      [
        { offset: 0, offsetDistance: "0%", opacity: 0 },
        { offset: 0.06, offsetDistance: "0%", opacity: 1 },
        { offset: 1, offsetDistance: "100%", opacity: 1 },
      ],
      { duration: 3000, easing: "linear", fill: "forwards" },
    );
    await trace.finished.catch(() => undefined);

    cursor.style.offsetPath = "none";
    trace.cancel();
    cursor.style.offsetDistance = "0%";
    parent.dataset.frameDone = "true";

    const selector = cursor.dataset.buildTarget;
    const target = selector ? parent.querySelector<HTMLElement>(selector) : null;
    if (action === "frame-type" && target) {
      const writing = writeWithCursor(cursor, parent, target);
      await writing.finished.catch(() => undefined);
    }
    parent.dataset.details = "true";
  }

  const target = cursor.dataset.buildTarget
    ? parent.querySelector<HTMLElement>(cursor.dataset.buildTarget)
    : parent;
  const parentRect = parent.getBoundingClientRect();
  const targetRect = target?.getBoundingClientRect();
  const circleX = action === "type"
    ? parentRect.width + 24
    : targetRect
    ? Math.min(targetRect.right - parentRect.left + 22, parentRect.width - 10)
    : parentRect.width - 18;
  const circleY = targetRect
    ? targetRect.top - parentRect.top + targetRect.height / 2
    : parentRect.height / 2;

  cursor.getAnimations().forEach((animation) => animation.cancel());
  cursor.style.opacity = "1";
  cursor.style.left = `${circleX - 11}px`;
  cursor.style.top = `${circleY - 11}px`;
  cursor.style.transform = "none";
  cursor.dataset.finishing = "true";
  await new Promise((resolve) => setTimeout(resolve, 900));
  const fade = cursor.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 420,
    easing: "ease-out",
    fill: "forwards",
  });
  await fade.finished.catch(() => undefined);
  delete cursor.dataset.finishing;
}

/** Runs a coordinated build pass once the section enters the viewport. */
export default function BuildReveal({
  children,
  className = "",
  label = "BUILD SEQUENCE",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const complete = () => {
      element.dataset.buildComplete = "true";
      window.dispatchEvent(new CustomEvent("build-reveal-complete", { detail: { label } }));
    };

    element.dataset.buildReady = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.built = "true";
      complete();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      element.dataset.built = "true";
      complete();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.built = "true";
        const cursors = Array.from(element.querySelectorAll<HTMLElement>(".build-pointer"));
        const tasks = cursors.map((cursor, index) => {
          const color = cursorColors[index % cursorColors.length];
          cursor.style.setProperty("--cursor-color", color);
          cursor.parentElement?.style.setProperty("--build-color", color);
          return buildPointer(cursor);
        });
        void Promise.all(tasks).then(complete);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [label]);

  return (
    <div
      ref={ref}
      className={`build-reveal ${className}`}
      data-built="false"
      data-build-label={label}
    >
      {children}
    </div>
  );
}

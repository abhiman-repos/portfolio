/**
 * One shared download of the scrub video.
 * The welcome screen starts it, the hero picks the finished file up.
 * Lives at module level, so React Strict Mode or re-mounts never download twice.
 */
export const VIDEO_SRC = "/video/portfolio-scrub.mp4";

type VideoState = { progress: number; url: string | null; failed: boolean };

let state: VideoState = { progress: 0, url: null, failed: false };
let started = false;
const listeners = new Set<() => void>();

const set = (next: VideoState) => {
  state = next;
  listeners.forEach((l) => l());
};

export const getVideoState = () => state;

export function subscribeVideo(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function startVideoLoad() {
  if (started || typeof window === "undefined") return;
  started = true;

  (async () => {
    try {
      const res = await fetch(VIDEO_SRC);
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const parts: BlobPart[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        parts.push(value as BlobPart);
        received += value.length;
        if (total) set({ ...state, progress: Math.min(0.99, received / total) });
      }
      const url = URL.createObjectURL(new Blob(parts, { type: "video/mp4" }));
      set({ progress: 1, url, failed: false });
    } catch (err) {
      console.error("Video preload failed, falling back to direct src:", err);
      set({ progress: 1, url: null, failed: true });
    }
  })();
}

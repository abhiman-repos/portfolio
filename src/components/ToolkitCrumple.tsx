"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { getTechnologyBrand } from "./BrandMark";

const PaperCrumple = lazy(() => import("./PaperCrumple"));

const sheetGroups = [
  { title: "LANGUAGES & FOUNDATIONS", tools: ["Python", "TypeScript"] },
  { title: "FRONTEND & PRODUCT", tools: ["React", "Next.js"] },
  { title: "BACKEND & APIS", tools: ["Django"] },
  { title: "AI ENGINEERING", tools: ["Google Gemini API", "LangChain"] },
  { title: "DATA & STORAGE", tools: ["PostgreSQL", "Redis", "MongoDB Atlas"] },
  { title: "INFRA & DELIVERY", tools: ["Docker", "GitHub Actions (CI/CD)", "Vercel"] },
];

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function makeToolkitSheet() {
  const rows = sheetGroups.map((group, row) => {
    const y = 188 + row * 78;
    const icons = group.tools.map((name, index) => {
      const brand = getTechnologyBrand(name);
      if (!brand) return "";
      const x = 227 + index * 92;
      const color = brand.hex === "000000" ? "172336" : brand.hex;
      return `<g transform="translate(${x} ${y + 15}) scale(1.15)"><path fill="#${color}" d="${brand.path}"/></g><text x="${x + 29}" y="${y + 33}" fill="#53627a" font-family="Arial,sans-serif" font-size="9" font-weight="600">${escapeXml(name.replace(" (CI/CD)", ""))}</text>`;
    }).join("");
    return `<g><rect x="32" y="${y}" width="456" height="66" rx="8" fill="#f8f7f3" stroke="#d8dce1"/><text x="49" y="${y + 37}" fill="#8b95a4" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing="1">0${row + 1}</text><text x="73" y="${y + 29}" fill="#25334a" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing=".4">${escapeXml(group.title)}</text>${icons}</g>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="710" viewBox="0 0 520 710"><rect width="520" height="710" rx="16" fill="#ecebe7"/><rect x="12" y="12" width="496" height="686" rx="12" fill="none" stroke="#bdc7d6"/><text x="34" y="54" fill="#52627b" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="2">ABHIMAN VISHWAKARMA / TOOLKIT</text><text x="34" y="105" fill="#18263a" font-family="Arial,sans-serif" font-size="29" font-weight="700" letter-spacing="-1">AI + FULL-STACK</text><text x="35" y="128" fill="#66748a" font-family="Arial,sans-serif" font-size="11">Tools I use to turn a problem into a working product.</text><path d="M34 151H486" stroke="#c8cfda"/>${rows}<text x="34" y="674" fill="#6b7b95" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing="1.3">THINK CLEARLY · BUILD WITH CARE · SHIP USEFUL THINGS</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const toolkitSheet = makeToolkitSheet();

export default function ToolkitCrumple() {
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-build-label="toolkit"]');
    const reveal = (event?: Event) => {
      const detail = (event as CustomEvent<{ label?: string }> | undefined)?.detail;
      if (!detail || detail.label === "toolkit") setPrepared(true);
    };
    window.addEventListener("build-reveal-complete", reveal);
    if (root?.dataset.buildComplete === "true") queueMicrotask(() => reveal());
    return () => window.removeEventListener("build-reveal-complete", reveal);
  }, []);

  if (!prepared) return null;

  return (
    <section className="toolkit-paper" aria-labelledby="toolkit-paper-title">
      <style>{styles}</style>
      <div className="toolkit-paper__copy">
        <p className="toolkit-paper__eyebrow"><span /> THE TOOLKIT, COMPLETE</p>
        <h3 id="toolkit-paper-title">One sheet.<br /><em>Everything I use.</em></h3>
        <p className="toolkit-paper__description">The tools behind the work, gathered into one interactive sheet. Give it a fold and watch the system take shape.</p>
        <p className="toolkit-paper__hint"><span>↗</span> Hold and drag the page to crumple it. Release to smooth it back out.</p>
        <p className="toolkit-paper__key">KEYBOARD · HOLD SPACE OR ENTER · ESC TO RESET</p>
      </div>
      <div className="toolkit-paper__stage">
        <Suspense fallback={<div className="toolkit-paper__loading" aria-hidden="true" />}>
          <PaperCrumple
            src={toolkitSheet}
            alt="A printed summary of the technologies in my toolkit"
            width={390}
            height={532}
            sceneHeight={520}
            imageFit="contain"
            releaseBehavior="restore"
            crumpleAmount={0.88}
            crumpleDuration={0.58}
            releaseDuration={0.72}
            foldCount={8}
            wrinkleDepth={0.72}
            creaseStrength={0.22}
            paperColor="#ecebe7"
            roughness={0.9}
            paperTexture={0.06}
            lightIntensity={2}
            shadow
            shadowOpacity={0.22}
            draggable
            dragRotation={12}
            detail={48}
            className="toolkit-paper__crumple"
          />
        </Suspense>
      </div>
    </section>
  );
}

const styles = `
  .toolkit-paper { display:grid; grid-template-columns:minmax(0,1fr) minmax(20rem,.86fr); align-items:center; gap:clamp(1rem,5vw,5rem); margin-top:5rem; padding:clamp(1.5rem,4vw,3.25rem); overflow:hidden; border:1px solid rgba(123,164,255,.19); border-radius:1.3rem; background:radial-gradient(60% 90% at 85% 50%,rgba(123,164,255,.1),transparent 75%),linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012)); animation:toolkit-paper-in .8s cubic-bezier(.2,.7,.1,1) both; }
  .toolkit-paper__copy { max-width:28rem; }
  .toolkit-paper__eyebrow { display:flex; align-items:center; gap:.6rem; color:#9bb7ed; font:600 .62rem/1.2 var(--display,system-ui); letter-spacing:.15em; }
  .toolkit-paper__eyebrow span { width:.4rem; height:.4rem; border-radius:50%; background:#7ba4ff; box-shadow:0 0 12px #7ba4ff; }
  .toolkit-paper h3 { margin-top:1.2rem; color:var(--bone,#ecebe7); font-size:clamp(2rem,4.5vw,3.5rem); line-height:.98; letter-spacing:-.06em; }
  .toolkit-paper h3 em { color:#9bb7ed; font-style:normal; font-weight:500; }
  .toolkit-paper__description { margin-top:1rem; color:var(--fog,#9b9ea6); font:400 .98rem/1.7 var(--serif,Georgia); }
  .toolkit-paper__hint { display:flex; align-items:flex-start; gap:.65rem; margin-top:1.6rem; color:rgba(236,235,231,.8); font:500 .78rem/1.55 var(--display,system-ui); }
  .toolkit-paper__hint span { color:#9bb7ed; font-size:1rem; }
  .toolkit-paper__key { margin-top:.8rem; color:rgba(155,158,166,.72); font:600 .53rem/1.5 var(--display,system-ui); letter-spacing:.1em; }
  .toolkit-paper__stage { min-width:0; min-height:26rem; }
  .toolkit-paper__loading { width:min(100%,19rem); height:26rem; margin:auto; border:1px solid rgba(123,164,255,.3); border-radius:.8rem; background:linear-gradient(145deg,rgba(236,235,231,.1),rgba(255,255,255,.02)); box-shadow:0 24px 38px rgba(0,0,0,.25); }
  .toolkit-paper__crumple { width:100%; min-height:26rem; color:#202a39; }
  @keyframes toolkit-paper-in { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @media(max-width:760px) { .toolkit-paper { grid-template-columns:1fr; gap:0; margin-top:3.5rem; }.toolkit-paper__copy { max-width:38rem; }.toolkit-paper__stage,.toolkit-paper__crumple { min-height:22rem; }.toolkit-paper__loading { height:22rem; } }
  @media(prefers-reduced-motion:reduce) { .toolkit-paper { animation:none; } }
`;

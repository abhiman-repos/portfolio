const scenes: Record<string, { label: string; eyebrow: string }> = {
  "ai-voice-support": { label: "VOICE SYSTEM", eyebrow: "LISTEN · RETRIEVE · RESPOND" },
  gocyn: { label: "LEARNING PLATFORM", eyebrow: "DISCOVER · LEARN · GROW" },
  "rp-infrastructure-website": { label: "DIGITAL PRESENCE", eyebrow: "PLAN · BUILD · DELIVER" },
  "garage-pos": { label: "WORKSHOP POS", eyebrow: "SCAN · BILL · SYNC" },
};

export default function ProjectArtwork({ slug, variant = "card" }: { slug: string; variant?: "card" | "detail" }) {
  const scene = scenes[slug] ?? { label: "PRODUCT SYSTEM", eyebrow: "DESIGN · ENGINEER · SHIP" };
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");

  return (
    <figure className={`project-art project-art--${safeSlug}${variant === "detail" ? " project-art--detail" : ""}`} aria-label={`${scene.label} project illustration`}>
      <div className="project-art__top"><span>{scene.label}</span><span>ABHIMAN / 0{Object.keys(scenes).indexOf(slug) + 1}</span></div>
      <svg viewBox="0 0 640 300" role="img" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`art-glass-${safeSlug}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#172238" /><stop offset="1" stopColor="#080c13" /></linearGradient>
          <linearGradient id={`art-line-${safeSlug}`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#789eff" stopOpacity=".12" /><stop offset=".55" stopColor="#a9c2ff" stopOpacity=".85" /><stop offset="1" stopColor="#789eff" stopOpacity=".12" /></linearGradient>
          <radialGradient id={`art-glow-${safeSlug}`}><stop stopColor="#7ba4ff" stopOpacity=".26" /><stop offset="1" stopColor="#7ba4ff" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="320" cy="158" rx="275" ry="142" fill={`url(#art-glow-${safeSlug})`} />
        <path d="M0 240H640M0 270H640M70 0V300M130 0V300M510 0V300M570 0V300" stroke="#9db8ed" strokeOpacity=".055" />
        {slug === "ai-voice-support" && <g>
          <rect x="76" y="47" width="488" height="207" rx="15" fill={`url(#art-glass-${safeSlug})`} stroke="#a9c2ff" strokeOpacity=".28" />
          <circle cx="169" cy="150" r="55" fill="#0b1220" stroke="#8fb0ff" strokeOpacity=".52" />
          <circle cx="169" cy="150" r="38" fill="#16243a" stroke="#8fb0ff" strokeOpacity=".32" />
          <path d="M169 130v22l15 9" fill="none" stroke="#d9e5ff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="169" cy="150" r="68" fill="none" stroke="#8fb0ff" strokeOpacity=".2" />
          <path d="M257 113h255M257 130h184" stroke="#dce7ff" strokeOpacity=".22" strokeWidth="5" strokeLinecap="round" />
          <path d="M257 183h16l8-16 12 34 14-49 13 37 11-23 12 17h17l9-10 10 10h26l9-19 12 19h16l9-12 9 12h37" fill="none" stroke={`url(#art-line-${safeSlug})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="510" cy="87" r="4" fill="#9dbaff" /><path d="M477 88h20" stroke="#9dbaff" strokeOpacity=".5" strokeWidth="2" />
        </g>}
        {slug === "gocyn" && <g>
          <rect x="78" y="43" width="484" height="214" rx="14" fill={`url(#art-glass-${safeSlug})`} stroke="#a9c2ff" strokeOpacity=".28" />
          <path d="M79 82h483" stroke="#a9c2ff" strokeOpacity=".16" />
          <circle cx="101" cy="63" r="4" fill="#9dbaff" /><circle cx="116" cy="63" r="4" fill="#9dbaff" fillOpacity=".4" />
          <rect x="103" y="103" width="124" height="126" rx="8" fill="#101a2a" stroke="#9dbaff" strokeOpacity=".18" />
          <circle cx="165" cy="145" r="20" fill="#273c5e" stroke="#b5ccff" strokeOpacity=".6" /><path d="M132 196c8-25 57-25 66 0" fill="none" stroke="#9dbaff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />
          <rect x="248" y="103" width="286" height="54" rx="8" fill="#101a2a" stroke="#9dbaff" strokeOpacity=".18" />
          <path d="M269 123h115M269 139h74" stroke="#dce7ff" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
          <rect x="248" y="169" width="132" height="60" rx="8" fill="#101a2a" stroke="#9dbaff" strokeOpacity=".18" />
          <rect x="394" y="169" width="140" height="60" rx="8" fill="#101a2a" stroke="#9dbaff" strokeOpacity=".18" />
          <path d="M267 208v-15l13-9 13 13 13-8 13 10 17-18 23 4" fill="none" stroke="#9dbaff" strokeWidth="2" />
          <circle cx="417" cy="197" r="14" fill="none" stroke="#728dbd" strokeWidth="6" /><path d="M417 183a14 14 0 0 1 13 19" fill="none" stroke="#b4ccff" strokeWidth="6" />
        </g>}
        {slug === "rp-infrastructure-website" && <g>
          <path d="M119 253V115l82-45 82 45v138M283 253V91l93-52 94 52v162M470 253V130l63-34 63 34v123" fill="#0c1320" fillOpacity=".74" stroke="#a9c2ff" strokeOpacity=".56" strokeWidth="2" />
          <path d="M119 115h164M283 91h187M470 130h126M151 253v-83h40v83M224 253v-83h40v83M316 253v-80h36v80M390 253v-80h36v80M494 253v-74h28v74M546 253v-74h28v74" fill="none" stroke="#a9c2ff" strokeOpacity=".35" strokeWidth="2" />
          <path d="M113 253h486" stroke="#d5e2ff" strokeOpacity=".72" strokeWidth="2" />
          <path d="M147 132h18m20 0h18m20 0h18M310 112h18m20 0h18m20 0h18m20 0h18m20 0h18" stroke="#d6e3ff" strokeOpacity=".45" strokeWidth="4" strokeLinecap="round" />
          <path d="M201 70V49l82 45M376 39V20l94 52" fill="none" stroke="#a9c2ff" strokeOpacity=".22" strokeWidth="2" />
          <circle cx="376" cy="65" r="3" fill="#c1d4ff" />
        </g>}
        {slug === "garage-pos" && <g>
          <rect x="87" y="51" width="362" height="205" rx="13" fill={`url(#art-glass-${safeSlug})`} stroke="#a9c2ff" strokeOpacity=".32" />
          <path d="M88 88h360" stroke="#a9c2ff" strokeOpacity=".18" />
          <circle cx="111" cy="69" r="4" fill="#9dbaff" /><circle cx="126" cy="69" r="4" fill="#9dbaff" fillOpacity=".4" />
          <rect x="111" y="108" width="185" height="21" rx="5" fill="#17243a" /><path d="M126 119h94" stroke="#bcd0f6" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />
          <rect x="111" y="143" width="185" height="21" rx="5" fill="#111a29" /><path d="M126 154h68" stroke="#bcd0f6" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
          <rect x="111" y="178" width="185" height="21" rx="5" fill="#111a29" /><path d="M126 189h112" stroke="#bcd0f6" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
          <rect x="111" y="215" width="185" height="24" rx="6" fill="#7ba4ff" fillOpacity=".22" stroke="#9dbaff" strokeOpacity=".48" />
          <rect x="330" y="105" width="181" height="139" rx="8" fill="#e5e9ef" />
          <path d="M349 128h137M349 139h112M349 157v24m7-24v24m6-24v24m12-24v24m4-24v24m10-24v24m6-24v24m12-24v24m7-24v24m11-24v24m5-24v24m13-24v24m7-24v24" stroke="#182235" strokeWidth="2" />
          <path d="M349 200h64m-64 10h92m-92 10h53" stroke="#6f7890" strokeWidth="3" strokeLinecap="round" />
        </g>}
      </svg>
      <figcaption>{scene.eyebrow}</figcaption>
    </figure>
  );
}

export const projectArtworkCss = `
  .project-art { --art-accent:#7ba4ff; position:relative; display:grid; grid-template-rows:auto 1fr auto; min-height:13rem; margin:0; padding:.9rem 1rem .7rem; overflow:hidden; border:1px solid rgba(255,255,255,.1); border-radius:.9rem; background:radial-gradient(65% 90% at 50% 65%,rgba(123,164,255,.11),transparent 78%),linear-gradient(145deg,#10151e,#07090d); }
  .project-art::after { content:""; position:absolute; inset:0; pointer-events:none; background:linear-gradient(120deg,rgba(255,255,255,.045),transparent 40%,rgba(123,164,255,.035)); }
  .project-art__top,.project-art figcaption { position:relative; z-index:1; display:flex; justify-content:space-between; gap:.5rem; color:rgba(205,220,249,.62); font:600 .53rem/1.2 var(--display,system-ui); letter-spacing:.13em; }
  .project-art svg { width:100%; height:100%; min-height:9.5rem; overflow:visible; }
  .project-art figcaption { justify-content:flex-start; color:rgba(205,220,249,.42); }
  .project-art--gocyn { background:radial-gradient(60% 90% at 50% 50%,rgba(123,164,255,.12),transparent 75%),linear-gradient(145deg,#111820,#07090d); }
  .project-art--rp-infrastructure-website { background:radial-gradient(60% 90% at 50% 50%,rgba(123,164,255,.11),transparent 75%),linear-gradient(145deg,#151a21,#07090d); }
  .project-art--garage-pos { background:radial-gradient(60% 90% at 50% 55%,rgba(123,164,255,.12),transparent 75%),linear-gradient(145deg,#111821,#07090d); }
  .project-art--detail { min-height:clamp(17rem,35vw,27rem); margin-top:2rem; border-radius:1.1rem; }
  .project-art--detail svg { min-height:15rem; }
  @media(max-width:600px) { .project-art { min-height:12rem; padding:.75rem .8rem .6rem; }.project-art--detail { min-height:16rem; }.project-art__top,.project-art figcaption { font-size:.47rem; } }
`;

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** SVG文字列を正規化（固定 width/height を消して暴走防止） */
function normalizeSvgText(text) {
  try {
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return text;

    svg.removeAttribute("width");
    svg.removeAttribute("height");

    // viewBox が無いと潰れる可能性があるので保険
    if (!svg.getAttribute("viewBox")) {
      svg.setAttribute("viewBox", "0 0 1000 300");
    }

    return new XMLSerializer().serializeToString(svg);
  } catch {
    // 最後の保険（svgタグの width/height だけ狙う）
    return text
      .replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1")
      .replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1");
  }
}

/** SVGが「自前で完成した見た目」を持ってそうなら preserve に倒す */
function guessMode(svg) {
  const nodes = Array.from(
    svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect")
  ).filter((el) => !el.closest("defs, clipPath, mask, pattern, marker"));

  const geom = nodes.filter((el) => typeof el.getTotalLength === "function");
  if (!geom.length) return "preserve";

  let filled = 0;
  let stroked = 0;
  const fills = new Set();
  const strokes = new Set();

  for (const el of geom) {
    const f = (el.getAttribute("fill") || "").trim();
    const s = (el.getAttribute("stroke") || "").trim();

    if (f && f !== "none") {
      filled++;
      fills.add(f);
    }
    if (s && s !== "none") {
      stroked++;
      strokes.add(s);
    }
  }

  // fill + stroke の混在、または色が複数 → preserve（タイポ/ロゴ系）
  if (filled > 0 && stroked > 0) return "preserve";
  if (fills.size + strokes.size >= 2) return "preserve";

  // 単色・単一用途なら draw でもOK（手書き線画など）
  return "draw";
}

export default function HandwrittenSvgTitle({
  src = "/yorisoi/menu.svg",
  label = "MENU",
  className = "",
  start = "top 82%",

  /** mode:
   *  - "preserve": SVGのfill/stroke/opacity等を一切いじらず、そのまま表示（menu1.svg向き）
   *  - "draw": 既存の“手書き描画”ロジック（stroke化してdashアニメ）
   *  - "auto": SVGの状態を見て自動判定（迷ったら preserve 優先）
   */
  mode = "auto",

  // drawモードの塗り替え色/線幅（preserve では無視）
  stroke = "rgba(84,63,48,0.94)",
  strokeWidth = 5.6,
  duration = 1.75,
  stagger = 0.08,
  once = true,

  // reveal
  revealY = 10,
  revealBlur = 0.12,
  revealDuration = 0.66,
}) {
  const wrapRef = useRef(null);
  const [svgText, setSvgText] = useState("");
  const originalRef = useRef("");

  useEffect(() => {
    let alive = true;

    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (!alive) return;
        const normalized = normalizeSvgText(text);
        originalRef.current = normalized;
        setSvgText(normalized);
      })
      .catch((err) => console.error("SVG load error:", err));

    return () => {
      alive = false;
    };
  }, [src]);

  const reduce = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (!svgText || !wrapRef.current) return;
    const wrap = wrapRef.current;

    const ctx = gsap.context(() => {
      const svg = wrap.querySelector("svg");
      if (!svg) return;

      // a11y + sizing
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", label);
      svg.setAttribute("preserveAspectRatio", "xMinYMid meet");

      // ここも念のため徹底
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.style.width = "100%";
      svg.style.maxWidth = "100%";
      svg.style.height = "auto";
      svg.style.display = "block";

      const resolvedMode = mode === "auto" ? guessMode(svg) : mode;

      // reduced-motion：即表示
      if (reduce) {
        gsap.set(wrap, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      // 共通：wrapの立ち上がり
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start,
          once,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        wrap,
        { opacity: 0, y: revealY, filter: `blur(${revealBlur}px)` },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: revealDuration,
          ease: "power3.out",
        },
        0
      );

      // preserve：ここで終了（SVGの見た目は一切いじらない）
      if (resolvedMode === "preserve") return;

      // draw：path等をstroke化してdashアニメ（旧手書き用）
      const nodes = Array.from(
        svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect")
      ).filter((el) => !el.closest("defs, clipPath, mask, pattern, marker"));

      const targets = nodes.filter((el) => typeof el.getTotalLength === "function");
      if (!targets.length) return;

      targets.forEach((el) => {
        const len = el.getTotalLength();
        el.style.fill = "none";
        el.style.stroke = stroke;
        el.style.strokeWidth = String(strokeWidth);
        el.style.strokeLinecap = "round";
        el.style.strokeLinejoin = "round";
        el.style.vectorEffect = "non-scaling-stroke";
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        el.style.opacity = "1";
      });

      tl.to(
        targets,
        {
          strokeDashoffset: 0,
          duration,
          ease: "power2.out",
          stagger,
        },
        0.06
      );
    }, wrap);

    return () => {
      ctx.revert();
      // DOM復元（mask等をやってた時の保険）
      if (wrapRef.current && originalRef.current) {
        wrapRef.current.innerHTML = originalRef.current;
      }
    };
  }, [
    svgText,
    label,
    start,
    mode,
    stroke,
    strokeWidth,
    duration,
    stagger,
    once,
    reduce,
    revealY,
    revealBlur,
    revealDuration,
  ]);

  return (
    <div
      ref={wrapRef}
      className={className}
      // ロード中のチラつき防止
      style={{ opacity: svgText ? 1 : 0 }}
      dangerouslySetInnerHTML={svgText ? { __html: svgText } : undefined}
    />
  );
}
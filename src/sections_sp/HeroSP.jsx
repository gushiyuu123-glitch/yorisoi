// src/sections_sp/HeroSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const tagsRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const photoRef = useRef(null);
  const ctxRef = useRef(null);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const coarse =
    typeof window !== "undefined"
      ? window.matchMedia?.("(pointer:coarse)")?.matches ?? true
      : true;

  const splitLine = (text) => (
    <span className="inline-block whitespace-nowrap" aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="char inline-block">
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );

  useLayoutEffect(() => {
    if (reduce) return;

    ctxRef.current = gsap.context(() => {
      const logo = logoRef.current;
      const tags = tagsRef.current;
      const title = titleRef.current;
      const sub = subRef.current;
      const photo = photoRef.current;

      if (!logo || !title || !sub || !photo) return;

      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;

      const bLogo = coarse ? "blur(0px)" : "blur(0.22px)";
      const bTags = coarse ? "blur(0px)" : "blur(0.18px)";
      const bChar = coarse ? "blur(0px)" : "blur(0.22px)";
      const bSub = coarse ? "blur(0px)" : "blur(0.18px)";
      const bPhoto = coarse ? "blur(0px)" : "blur(0.24px)";

      const tl = gsap.timeline({ delay: 0.16 });

      tl.fromTo(
        logo,
        { opacity: 0, y: 10, filter: bLogo },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.62, ease: "power3.out" }
      );

      if (tags) {
        tl.fromTo(
          tags,
          { opacity: 0, y: 8, filter: bTags },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.50, ease: "power3.out" },
          "-=0.44"
        );
      }

      tl.fromTo(
        chars,
        { opacity: 0, y: 14, filter: bChar },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.70,
          stagger: 0.020,
          ease: "power3.out",
        },
        "-=0.18"
      );

      tl.fromTo(
        sub,
        { opacity: 0, y: 10, filter: bSub },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, ease: "power3.out" },
        "-=0.36"
      );

      tl.fromTo(
        photo,
        { opacity: 0.72, scale: 1.02, x: 8, filter: bPhoto },
        { opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 0.88, ease: "power3.out" },
        "-=0.72"
      );
    }, rootRef);

    return () => ctxRef.current?.revert?.();
  }, [reduce, coarse]);

  const LINE1 = "浦添のメンズ専門理容室。";
  const LINE2 = "朝7時から。";
  const TAGS = ["半個室", "マンツーマン", "シェービング", "駐車場あり"];

  // ✅ SPはPCと同文を避ける（同義で分散）
  const LEAD = "一人で通し。途中で担当が変わりません。";
  const SUB_1 = "最初に、直したい所だけ教えてください。";
  const SUB_2 = "毛流れと生え方を見て、乾かしただけで決まる輪郭に落とします。";
  const SUB_3 = "必要なときは、持ち重視のパーマも選べます。";

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#f7f4ef]"
      aria-label="ヨリソイ Hero（スマホ）"
    >
      <div className="relative w-full min-h-[100svh] z-[0] overflow-hidden">
        <img
          ref={photoRef}
          src="/yorisoi/hero2.jpg"
          alt="ヨリソイ Hair&Spa 店内"
          className="
            w-full h-[100svh] object-cover
            [filter:brightness(1.02)_contrast(0.90)_saturate(0.95)]
            scale-[1.02]
          "
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0
          top-[20vh] bottom-[12vh]
          z-[30] pointer-events-none
          bg-[linear-gradient(
            to_bottom,
            rgba(247,244,239,0.00) 0%,
            rgba(247,244,239,0.56) 12%,
            rgba(247,244,239,0.82) 34%,
            rgba(247,244,239,0.86) 68%,
            rgba(247,244,239,0.64) 100%
          )]
          backdrop-blur-[2.4px]
          [@media(pointer:coarse)]:backdrop-blur-0
        "
      />

      <div
        className="
          absolute inset-x-0
          top-[22vh] bottom-[12vh]
          px-[6vw]
          z-[80]
          flex flex-col
        "
      >
        <div>
          <div
            ref={logoRef}
            className="
              text-[13px]
              tracking-[0.22em]
              text-[rgba(46,42,39,0.66)]
              font-light
            "
          >
            ヨリソイ Hair&Spa
          </div>

          <ul
            ref={tagsRef}
            className="
              mt-3
              flex flex-wrap
              gap-x-2.5 gap-y-1.5
              text-[11px]
              tracking-[0.18em]
              text-[rgba(46,42,39,0.58)]
            "
            aria-label="店舗の特徴"
          >
            {TAGS.map((t) => (
              <li key={t} className="whitespace-nowrap">
                [{t}]
              </li>
            ))}
          </ul>

          <h1
            ref={titleRef}
            aria-label={`${LINE1} ${LINE2}`}
            className="
              mt-[5vh]
              text-[clamp(19px,6.0vw,25px)]
              leading-[1.22]
              tracking-[0.005em]
              font-medium
              text-[rgba(46,42,39,0.94)]
            "
          >
            <span className="block whitespace-nowrap">{splitLine(LINE1)}</span>
            <span className="block whitespace-nowrap mt-[0.28em]">{splitLine(LINE2)}</span>
          </h1>

          <p
            className="
              mt-4
              text-[clamp(12px,3.3vw,13.5px)]
              leading-[1.85]
              tracking-[0.01em]
              text-[rgba(46,42,39,0.78)]
              max-w-[32em]
            "
          >
            {LEAD}
          </p>

          <p
            ref={subRef}
            className="
              mt-6
              text-[clamp(11px,3.1vw,13px)]
              leading-[1.9]
              tracking-[0.01em]
              text-[rgba(46,42,39,0.76)]
              max-w-[32em]
            "
          >
            {SUB_1}
            <br />
            {SUB_2}
            <br />
            {SUB_3}
          </p>
        </div>

        <div className="flex-1" />
      </div>

      {reduce && (
        <style>{`
          .char { opacity: 1 !important; transform: none !important; filter: none !important; }
        `}</style>
      )}
    </section>
  );
}
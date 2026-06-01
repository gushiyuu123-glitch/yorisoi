// src/sections_sp/HeroSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
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
      const title = titleRef.current;
      const photo = photoRef.current;
      if (!title || !photo) return;

      const chars = title.querySelectorAll(".char");
      if (!chars.length) return;

      const bChar = coarse ? "blur(0px)" : "blur(0.22px)";
      const bPhoto = coarse ? "blur(0px)" : "blur(0.24px)";

      const tl = gsap.timeline({ delay: 0.16 });

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
        }
      );

      tl.fromTo(
        photo,
        { opacity: 0.72, scale: 1.02, x: 8, filter: bPhoto },
        { opacity: 1, scale: 1, x: 0, filter: "blur(0px)", duration: 0.88, ease: "power3.out" },
        "-=0.58"
      );
    }, rootRef);

    return () => ctxRef.current?.revert?.();
  }, [reduce, coarse]);

  const LINE1 = "浦添のメンズ専門理容室。";
  const LINE2 = "朝7時から。";

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

      {/* 文字を読むための膜（そのまま維持） */}
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

      {/* タイトルだけ残す */}
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
          <h1
            ref={titleRef}
            aria-label={`${LINE1} ${LINE2}`}
            className="
              mt-[7.3vh]
              text-[clamp(24px,6.6vw,28px)]
              leading-[1.22]
              tracking-[0.005em]
              font-medium
              text-[rgba(46,42,39,0.94)]
            "
          >
            <span className="block whitespace-nowrap">{splitLine(LINE1)}</span>
            <span className="block whitespace-nowrap mt-[0.28em]">{splitLine(LINE2)}</span>
          </h1>
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
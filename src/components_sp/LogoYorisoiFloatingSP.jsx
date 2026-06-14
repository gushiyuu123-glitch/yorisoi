// src/components_sp/LogoYorisoiFloatingSP.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function LogoYorisoiFloatingSP() {
  const wrapRef = useRef(null);
  const introTweenRef = useRef(null);

  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const coarse =
    typeof window !== "undefined"
      ? window.matchMedia?.("(pointer:coarse)")?.matches ?? true
      : true;

  const perf = reduce || coarse;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    el.style.pointerEvents = "auto";

    if (perf) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    introTweenRef.current = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 8, filter: "blur(0.2px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        ease: "power3.out",
        delay: 0.6,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [perf]);

  const goHome = () => {
    if (pathname !== "/") {
      navigate({ pathname: "/", hash: "#home" });
      return;
    }

    if (hash !== "#home") {
      navigate({ hash: "#home" });
      return;
    }

    window.scrollTo({ top: 0, behavior: perf ? "auto" : "smooth" });
  };

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={goHome}
      aria-label="トップへ戻る（ヨリソイ Hair＆Spa）"
      className="
        fixed top-[calc(13px+env(safe-area-inset-top))] left-[12px] z-[120]

        h-[43px] w-auto
        pl-[10px] pr-[12px]

        flex items-center gap-[8px]

        rounded-[10px]

        bg-[linear-gradient(135deg,rgba(247,244,239,0.62),rgba(247,244,239,0.34))]
        border border-[rgba(255,255,255,0.44)]
        shadow-[0_1px_0_rgba(255,255,255,0.44)_inset,0_5px_16px_rgba(62,47,35,0.045)]

        backdrop-blur-[7px]
        backdrop-saturate-[1.06]

        active:scale-[0.965]
        transition-[opacity,transform,background-color,box-shadow]
        duration-200
        cursor-pointer
        transform-gpu
        will-change-transform
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          rounded-[10px]
          bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28),rgba(255,255,255,0.00)_58%)]
          pointer-events-none
        "
      />

      <img
        src="/yorisoi/bird-logo.png"
        alt=""
        className="
          relative z-[1]
          w-[26px] h-[26px]
          opacity-[0.82]
          pointer-events-none
        "
        decoding="async"
      />

      <span className="relative z-[1] flex flex-col items-start leading-[1.04] pointer-events-none">
        <span className="text-[11px] tracking-[0.15em] text-[rgba(46,42,39,0.74)] font-medium">
          ヨリソイ
        </span>
        <span className="text-[9.2px] tracking-[0.20em] text-[rgba(46,42,39,0.45)]">
          Hair＆Spa
        </span>
      </span>
    </button>
  );
}
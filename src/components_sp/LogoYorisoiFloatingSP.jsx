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
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
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
        fixed top-[calc(14px+env(safe-area-inset-top))] left-[14px] z-[120]
        h-[44px] w-auto
        pl-[10px] pr-[12px]
        flex items-center gap-[8px]

        rounded-[13px]
        bg-[rgba(247,244,239,0.82)]
        border border-[rgba(96,78,62,0.12)]
        shadow-[0_6px_18px_rgba(0,0,0,0.06)]
        [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]

        active:scale-[0.96]
        transition-transform
        cursor-pointer
        will-change-transform
      "
    >
      {/* 角欠けの“折り目”気配（超薄・小さく） */}
      <span
        aria-hidden="true"
        className="
          absolute top-0 right-0
          w-[14px] h-[14px]
          bg-[linear-gradient(135deg,rgba(96,78,62,0.07)_0%,rgba(96,78,62,0.00)_72%)]
          pointer-events-none
        "
      />

      {/* 1pxの内側シーム（さらに薄く） */}
      <span
        aria-hidden="true"
        className="
          absolute inset-[5px]
          rounded-[10px]
          border border-[rgba(96,78,62,0.055)]
          pointer-events-none
        "
      />

      <img
        src="/yorisoi/bird-logo.png"
        alt=""
        className="w-[26px] h-[26px] opacity-[0.86] pointer-events-none"
        decoding="async"
      />

      {/* 店名（2段） */}
      <span className="flex flex-col items-start leading-[1.04] pointer-events-none">
        <span className="text-[11.2px] tracking-[0.15em] text-[rgba(46,42,39,0.78)] font-medium">
          ヨリソイ
        </span>
        <span className="text-[9.4px] tracking-[0.20em] text-[rgba(46,42,39,0.48)]">
          Hair＆Spa
        </span>
      </span>

      {/* 署名点：消す（“多い”を回避） */}
      {/* <span aria-hidden="true" className="ml-[1px] h-[3px] w-[3px] rounded-full bg-[rgba(96,78,62,0.18)]" /> */}
    </button>
  );
}
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

  // ✅ スマホ（実機想定）では“動かさない”
  const coarse =
    typeof window !== "undefined"
      ? window.matchMedia?.("(pointer:coarse)")?.matches ?? true
      : true;

  const perf = reduce || coarse;

  /* 初回フェードイン（スマホは軽く：blur無し） */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    el.style.pointerEvents = "auto";

    // perf（スマホ/減速）→ 即表示 or 超軽アニメ
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
        delay: 0.95,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [perf]);

  /* Home帰還（hash更新だけ） */
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
      aria-label="トップへ戻る"
      className="
        fixed top-[calc(14px+env(safe-area-inset-top))] right-[14px] z-[110]
        w-[58px] h-[58px]
        bg-[linear-gradient(
          to_bottom,
          rgba(255,255,255,0.78) 0%,
          rgba(255,255,255,0.66) 30%,
          rgba(255,255,255,0.46) 70%,
          rgba(255,255,255,0.00) 100%
        )]

        /* ✅ スマホはblur無効（重い） */
        backdrop-blur-[11px]
        [@media(pointer:coarse)]:backdrop-blur-0

        rounded-full
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        flex items-center justify-center
        active:scale-[0.94]
        transition-transform
        cursor-pointer
        will-change-transform
      "
    >
      {/* 内側の淡い光膜（スマホはblur落とす） */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 rounded-full
          bg-[rgba(255,255,255,0.45)]
          opacity-[0.26]
          blur-[14px]
          [@media(pointer:coarse)]:blur-0
          pointer-events-none -z-10
        "
      />

      <img
        src="/yorisoi/bird-logo.png"
        alt=""
        className="w-[34px] h-[34px] opacity-[0.94] pointer-events-none"
        decoding="async"
      />
    </button>
  );
}
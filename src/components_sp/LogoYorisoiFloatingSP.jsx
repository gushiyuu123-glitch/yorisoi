// src/components_sp/LogoYorisoiFloatingSP.jsx
// ============================================================================
// LogoYorisoiFloatingSP — 右上常駐（Home帰還）
//  - スクロールは HashScroll が担当（ロゴは hash 更新のみ）
//  - reduce-motion 対応
//  - スクロール隠しは rAF + 閾値 + 停止復帰でバタつき防止
//  - ✅ hidden時に「見えないのに押せる」を防ぐ（pointer-events / autoAlpha）
//  - ✅ safe-area 対応（iPhone notch）
// ============================================================================
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function LogoYorisoiFloatingSP() {
  const wrapRef = useRef(null);

  const introTweenRef = useRef(null);
  const breatheTweenRef = useRef(null);

  const lastYRef = useRef(0);
  const rafRef = useRef(0);
  const hiddenRef = useRef(false);
  const stopTimerRef = useRef(null);

  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  /* ==================================
        初回フェードイン（控えめ）
  ================================== */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // 初期は押せる状態
    el.style.pointerEvents = "auto";

    if (reduce) {
      gsap.set(el, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    introTweenRef.current = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 10, filter: "blur(0.28px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        ease: "power3.out",
        delay: 0.95,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [reduce]);

  /* ==================================
        呼吸アニメ（超薄）
  ================================== */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;

    breatheTweenRef.current = gsap.to(el, {
      scale: 1.003,
      duration: 4.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => breatheTweenRef.current?.kill?.();
  }, [reduce]);

  /* ==================================
        スクロールで隠す（バタつき防止）
        ✅ hidden時の押せる事故を潰す
  ================================== */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    lastYRef.current = window.scrollY || 0;

    const SHOW_Y = 0;
    const HIDE_Y = 72;

    const THRESHOLD = 6; // 微小スクロール無視
    const RESTORE_DELAY = 240;

    const setPointer = (hide) => {
      el.style.pointerEvents = hide ? "none" : "auto";
    };

    const animateTo = (hide) => {
      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(el);

      if (reduce) {
        setPointer(hide);
        gsap.set(el, {
          y: hide ? HIDE_Y : SHOW_Y,
          autoAlpha: hide ? 0 : 1,
        });
        return;
      }

      // 隠す瞬間に即 pointer-events を切る（事故防止）
      if (hide) setPointer(true);

      gsap.to(el, {
        y: hide ? HIDE_Y : SHOW_Y,
        autoAlpha: hide ? 0 : 1,
        duration: hide ? 0.22 : 0.30,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          // 出し切ったら押せる
          if (!hide) setPointer(false);
        },
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastYRef.current;

        // 停止したら戻す
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = setTimeout(() => animateTo(false), RESTORE_DELAY);

        if (Math.abs(diff) >= THRESHOLD) {
          animateTo(diff > 0); // 下スクロールで隠す
        }

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(el);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, [reduce]);

  /* ==================================
        Home帰還（hash更新だけ）
        - 他ルート → "/#home"
        - すでに "#home" なら scrollTo(0)
  ================================== */
  const goHome = () => {
    if (pathname !== "/") {
      navigate({ pathname: "/", hash: "#home" });
      return;
    }

    if (hash !== "#home") {
      navigate({ hash: "#home" });
      return;
    }

    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
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
          rgba(255,255,255,0.65) 0%,
          rgba(255,255,255,0.52) 30%,
          rgba(255,255,255,0.32) 70%,
          rgba(255,255,255,0) 100%
        )]
        backdrop-blur-[11px]
        rounded-full
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        flex items-center justify-center
        active:scale-[0.94]
        transition-transform
        cursor-pointer
        will-change-transform
      "
    >
      {/* 内側の淡い光膜 */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0 rounded-full
          bg-[rgba(255,255,255,0.45)]
          opacity-[0.26]
          blur-[14px]
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
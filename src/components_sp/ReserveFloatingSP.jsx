// src/components_sp/ReserveFloatingSP.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function ReserveFloatingSP() {
  const wrapRef = useRef(null);
  const introTweenRef = useRef(null);

  const [showTel, setShowTel] = useState(false);
  const [armed, setArmed] = useState(false);
  const armTimerRef = useRef(null);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const coarse =
    typeof window !== "undefined"
      ? window.matchMedia?.("(pointer:coarse)")?.matches ?? true
      : true;

  const perf = reduce || coarse;

  const RESERVE_URL =
    "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

  // ✅ 実番号
  const TEL_DISPLAY = "090-7357-0926";
  const TEL_HREF = useMemo(
    () => `tel:${TEL_DISPLAY.replace(/[^\d]/g, "")}`, // tel:09073570926
    [TEL_DISPLAY]
  );

  // ✅ Hero中は出さない（少しスクロールしたら出す）
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const threshold = Math.round(window.innerHeight * 0.28);
      const next = y > threshold;
      setShowTel(next);
      if (!next) setArmed(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ 初回のふわっと出現（予約だけGSAPで）
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (perf) {
      gsap.set(el, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      return;
    }

    gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });

    const reserveBtn = el.querySelector('[data-float-item="reserve"]');
    if (!reserveBtn) return;

    introTweenRef.current = gsap.fromTo(
      reserveBtn,
      { autoAlpha: 0, y: -8, filter: "blur(0.18px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.68,
        ease: "power3.out",
        delay: 0.9,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [perf]);

  // ✅ 誤タップ防止：二段階タップ
  useEffect(() => {
    return () => {
      if (armTimerRef.current) clearTimeout(armTimerRef.current);
    };
  }, []);

  const onTelClick = (e) => {
    if (!showTel) {
      e.preventDefault();
      return;
    }
    if (!armed) {
      // 1回目：発信せず「武装」だけ
      e.preventDefault();
      setArmed(true);
      if (armTimerRef.current) clearTimeout(armTimerRef.current);
      armTimerRef.current = setTimeout(() => setArmed(false), 2400);
      return;
    }
    // 2回目：発信（デフォルト動作）
    setArmed(false);
  };

  return (
    <div
      ref={wrapRef}
      className="
        fixed top-[calc(14px+env(safe-area-inset-top))] right-[14px] z-[120]
        flex flex-col items-end gap-2
        will-change-transform
      "
    >
      {/* 予約（主役） */}
      <a
        data-float-item="reserve"
        href={RESERVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="HotPepperで予約する"
        className="
          inline-flex items-center
          px-[14px] py-[7px]
          text-[11.5px]
          tracking-[0.10em]
          font-medium
          rounded-[10px]

          bg-[rgba(236,206,216,0.52)]
          text-[rgba(86,58,68,0.84)]
          border border-[rgba(255,255,255,0.40)]

          backdrop-blur-[10px]
          [@media(pointer:coarse)]:backdrop-blur-0

          shadow-[0_4px_14px_rgba(0,0,0,0.085)]
          active:scale-[0.955]
          transition-all
          cursor-pointer
        "
      >
        予約（HotPepper）
      </a>

  {/* ✅ 電話（予約変更・キャンセル用）— 小さく／Heroでは出さない／二段階タップ */}
<a
  data-float-item="tel"
  href={TEL_HREF}
  onClick={onTelClick}
  aria-label={
    armed
      ? "もう一度タップで発信（予約変更・キャンセル）"
      : "電話する（予約変更・キャンセル）"
  }
  className={`
    inline-flex items-center justify-end
    px-[12px] py-[7px]
    rounded-[10px]

    bg-[rgba(247,244,239,0.46)]
    text-[rgba(86,58,68,0.74)]
    border border-[rgba(255,255,255,0.36)]
    backdrop-blur-[10px]
    [@media(pointer:coarse)]:backdrop-blur-0

    shadow-[0_4px_12px_rgba(0,0,0,0.06)]
    active:scale-[0.96]
    transition-all
    cursor-pointer

    max-w-[78vw]  /* ✅ 長文でもはみ出さない */
    ${showTel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
>
  <span className="flex flex-col items-end leading-[1.15]">
    <span className="text-[10px] tracking-[0.10em] opacity-[0.78]">
      予約変更・キャンセル
    </span>

    <span className="text-[10.8px] tracking-[0.06em]">
      TEL {TEL_DISPLAY}
      {armed && (
        <span className="ml-2 text-[10px] opacity-[0.72]">もう一度</span>
      )}
    </span>
  </span>
</a>
    </div>
  );
}
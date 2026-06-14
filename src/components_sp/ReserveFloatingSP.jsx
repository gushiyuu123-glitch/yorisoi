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

  const TEL_DISPLAY = "090-7357-0926";
  const TEL_HREF = useMemo(
    () => `tel:${TEL_DISPLAY.replace(/[^\d]/g, "")}`,
    [TEL_DISPLAY]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const threshold = Math.round(window.innerHeight * 0.28);
        const next = y > threshold;

        setShowTel(next);
        if (!next) setArmed(false);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      { autoAlpha: 0, y: -7, filter: "blur(0.2px)" },
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
      e.preventDefault();
      setArmed(true);

      if (armTimerRef.current) clearTimeout(armTimerRef.current);
      armTimerRef.current = setTimeout(() => setArmed(false), 2400);
      return;
    }

    setArmed(false);
  };

  return (
    <div
      ref={wrapRef}
      className="
        fixed top-[calc(13px+env(safe-area-inset-top))] right-[12px] z-[120]
        flex flex-col items-end gap-[7px]
        transform-gpu will-change-transform
      "
    >
      {/* 予約 */}
      <a
        data-float-item="reserve"
        href={RESERVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="HotPepperで予約する"
        className="
          inline-flex items-center
          px-[13px] py-[7px]

          text-[11.2px]
          tracking-[0.11em]
          font-medium

          rounded-[9px]

          bg-[linear-gradient(135deg,rgba(248,228,235,0.58),rgba(247,244,239,0.34))]
          text-[rgba(82,55,64,0.82)]

          border border-[rgba(255,255,255,0.46)]
          shadow-[0_1px_0_rgba(255,255,255,0.48)_inset,0_5px_16px_rgba(62,47,35,0.055)]

          backdrop-blur-[7px]
          backdrop-saturate-[1.08]

          active:scale-[0.965]
          transition-[opacity,transform,background-color,box-shadow]
          duration-200
          cursor-pointer
        "
      >
        予約（HotPepper）
      </a>

      {/* 電話 */}
      <a
        data-float-item="tel"
        href={TEL_HREF}
        onClick={onTelClick}
        aria-label={
          armed
            ? `もう一度タップで発信（${TEL_DISPLAY}）`
            : `電話する（${TEL_DISPLAY}）`
        }
        className={`
          inline-flex items-center justify-end
          px-[11px] py-[6.5px]

          rounded-[9px]

          bg-[linear-gradient(135deg,rgba(247,244,239,0.54),rgba(247,244,239,0.24))]
          text-[rgba(82,55,64,0.68)]

          border border-[rgba(255,255,255,0.42)]
          shadow-[0_1px_0_rgba(255,255,255,0.42)_inset,0_4px_13px_rgba(62,47,35,0.045)]

          backdrop-blur-[7px]
          backdrop-saturate-[1.06]

          active:scale-[0.965]
          transition-[opacity,transform,filter]
          duration-240
          cursor-pointer

          max-w-[78vw]
          ${
            showTel
              ? "opacity-100 translate-y-0 pointer-events-auto blur-0"
              : "opacity-0 -translate-y-[4px] pointer-events-none blur-[0.5px]"
          }
        `}
      >
        <span className="text-[12.2px] tracking-[0.105em] font-medium whitespace-nowrap">
          TEL {TEL_DISPLAY}
          {armed && (
            <span className="ml-2 text-[9.8px] tracking-[0.08em] opacity-[0.62]">
              再タップ
            </span>
          )}
        </span>
      </a>
    </div>
  );
}
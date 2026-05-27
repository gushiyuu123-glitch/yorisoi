// src/components_sp/ReserveFloatingSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReserveFloatingSP() {
  const wrapRef = useRef(null);
  const introTweenRef = useRef(null);

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

    const kids = Array.from(el.querySelectorAll("[data-float-item]"));

    if (perf) {
      gsap.set(el, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      gsap.set(kids, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });
    introTweenRef.current = gsap.fromTo(
      kids,
      { autoAlpha: 0, y: -8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.68,
        ease: "power3.out",
        delay: 0.9,
        stagger: 0.06,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [perf]);

  const RESERVE_URL =
    "https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136";

  return (
    <div
      ref={wrapRef}
      className="
        fixed top-[calc(14px+env(safe-area-inset-top))] right-[14px] z-[120]
        flex items-center
        will-change-transform
      "
    >
      <a
        data-float-item
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

          /* ✅ 主張を抑える（ここだけ調整） */
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
    </div>
  );
}
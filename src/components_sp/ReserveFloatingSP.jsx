// src/components_sp/ReserveFloatingSP.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function NewsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 3h10a2 2 0 0 1 2 2v14" />
      <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
      <path d="M8 15h6" />
    </svg>
  );
}

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

  /* 初回フェードイン（スマホは軽く：blur無し） */
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

  return (
    <div
      ref={wrapRef}
      className="
        fixed top-[calc(14px+env(safe-area-inset-top))] left-[14px] z-[110]
        flex items-center gap-2
        will-change-transform
      "
    >
      {/* お知らせ（サブ） */}
      <Link
        data-float-item
        to="/news"
        aria-label="お知らせを見る"
        className="
          inline-flex items-center gap-2
          px-[12px] py-[7px]
          text-[11.2px]
          tracking-[0.08em]
          font-medium
          rounded-[10px]

          bg-[rgba(247,244,239,0.72)]
          text-[rgba(86,58,68,0.78)]
          border border-[rgba(255,255,255,0.55)]

          /* ✅ スマホはblur無効（重い） */
          backdrop-blur-[10px]
          [@media(pointer:coarse)]:backdrop-blur-0

          shadow-[0_6px_18px_rgba(0,0,0,0.08)]
          active:scale-[0.94]
          transition-all
          cursor-pointer
        "
      >
        <NewsIcon className="opacity-[0.72]" />
        <span className="relative top-[0.5px]">お知らせ</span>
      </Link>

      {/* HotPepper（主役） */}
      <a
        data-float-item
        href="https://beauty.hotpepper.jp/slnH000706136/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="HotPepperへ"
        className="
          inline-flex items-center
          px-[14px] py-[7px]
          text-[11.5px]
          tracking-[0.14em]
          font-medium
          rounded-[10px]

          bg-[rgba(236,206,216,0.70)]
          text-[rgba(86,58,68,0.92)]
          border border-[rgba(255,255,255,0.55)]

          /* ✅ スマホはblur無効（重い） */
          backdrop-blur-[10px]
          [@media(pointer:coarse)]:backdrop-blur-0

          shadow-[0_6px_18px_rgba(0,0,0,0.10)]
          active:scale-[0.94]
          transition-all
          cursor-pointer
        "
      >
        HotPepperへ
      </a>
    </div>
  );
}
// src/components/ReserveFloating.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function NewsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

export default function ReserveFloating() {
  const ref = useRef(null);
  const introTweenRef = useRef(null);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const kids = Array.from(el.querySelectorAll("[data-float-item]"));

    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      gsap.set(kids, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(el, { opacity: 1 });
    introTweenRef.current = gsap.fromTo(
      kids,
      { opacity: 0, y: -8, filter: "blur(0.22px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.72,
        ease: "power3.out",
        delay: 1.0,
        stagger: 0.06,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className="
        fixed top-[4vh] right-[6vw] z-[120]
        flex items-center gap-3
        will-change-transform
      "
    >
      {/* お知らせ（控えめ） */}
      <Link
        data-float-item
        to="/news"
        aria-label="お知らせを見る"
        className="
          inline-flex items-center gap-2
          px-4 py-2.5
          text-[13px]
          tracking-[0.08em]
          rounded-[10px]

          bg-[rgba(247,244,239,0.55)]
          text-[rgba(86,58,68,0.78)]
          border border-[rgba(255,255,255,0.55)]
          backdrop-blur-[6px]

          shadow-[0_6px_18px_rgba(0,0,0,0.06)]
          hover:bg-[rgba(247,244,239,0.72)]
          hover:shadow-[0_10px_26px_rgba(0,0,0,0.10)]
          hover:text-[rgba(74,48,57,0.92)]

          active:scale-[0.985]
          transition-all
          cursor-pointer

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[rgba(86,58,68,0.35)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[rgba(247,244,239,0.92)]
        "
      >
        <NewsIcon className="opacity-[0.72]" />
        <span className="relative top-[1px]">お知らせ</span>
      </Link>

      {/* 予約（主役） */}
      <a
        data-float-item
        href="https://beauty.hotpepper.jp/CSP/bt/reserve/?storeId=H000706136"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="HotPepperで予約する"
        className="
          inline-flex items-center
          px-6 py-2.5
          text-[14px]
          tracking-[0.14em]
          rounded-[10px]

          bg-[rgba(236,206,216,0.58)]
          text-[rgba(86,58,68,0.92)]
          border border-[rgba(255,255,255,0.55)]
          backdrop-blur-[8px]

          shadow-[0_6px_18px_rgba(0,0,0,0.08)]
          hover:bg-[rgba(236,206,216,0.72)]
          hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)]
          hover:text-[rgba(74,48,57,0.96)]

          active:scale-[0.985]
          transition-all
          cursor-pointer

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[rgba(86,58,68,0.35)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[rgba(247,244,239,0.92)]
        "
      >
        予約する
      </a>
    </div>
  );
}
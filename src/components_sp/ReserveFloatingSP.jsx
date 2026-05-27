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

  const rafRef = useRef(0);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const stopTimerRef = useRef(null);

  const introTweenRef = useRef(null);
  const breatheTweenRef = useRef(null);

  const reduce =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  /* 初回フェードイン（2ボタンを軽くstagger） */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const kids = Array.from(el.querySelectorAll("[data-float-item]"));

    if (reduce) {
      gsap.set(el, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        pointerEvents: "auto",
      });
      gsap.set(kids, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });
    introTweenRef.current = gsap.fromTo(
      kids,
      { autoAlpha: 0, y: -8, filter: "blur(0.20px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.68,
        ease: "power3.out",
        delay: 0.9,
        stagger: 0.06,
      }
    );

    return () => introTweenRef.current?.kill?.();
  }, [reduce]);

  /* 呼吸（HotPepperボタンだけ） */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduce) return;

    const hot = el.querySelector("[data-breathe]");
    if (!hot) return;

    breatheTweenRef.current = gsap.to(hot, {
      scale: 1.0022,
      duration: 3.6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => breatheTweenRef.current?.kill?.();
  }, [reduce]);

  /* スクロールで引く（押せない事故防止で pointerEvents も切る） */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    lastYRef.current = window.scrollY || 0;

    const THRESHOLD = 6;
    const RESTORE_DELAY = 240;

    const animateTo = (hide) => {
      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(el);

      if (reduce) {
        gsap.set(el, {
          y: hide ? -18 : 0,
          autoAlpha: hide ? 0 : 1,
          pointerEvents: hide ? "none" : "auto",
        });
        return;
      }

      gsap.to(el, {
        y: hide ? -18 : 0,
        autoAlpha: hide ? 0 : 1,
        duration: hide ? 0.22 : 0.28,
        ease: "power3.out",
        overwrite: "auto",
        onStart: () => {
          // 隠す瞬間に押せなくする
          if (hide) el.style.pointerEvents = "none";
        },
        onComplete: () => {
          // 出したら押せる
          if (!hide) el.style.pointerEvents = "auto";
        },
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastYRef.current;

        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = setTimeout(() => animateTo(false), RESTORE_DELAY);

        if (Math.abs(diff) >= THRESHOLD) {
          animateTo(diff > 0); // 下で隠す
        }

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      gsap.killTweensOf(el);
    };
  }, [reduce]);

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

          bg-[rgba(247,244,239,0.52)]
          text-[rgba(86,58,68,0.78)]
          border border-[rgba(255,255,255,0.55)]
          backdrop-blur-[10px]

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
        data-breathe
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

          bg-[rgba(236,206,216,0.58)]
          text-[rgba(86,58,68,0.92)]
          border border-[rgba(255,255,255,0.55)]
          backdrop-blur-[10px]

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
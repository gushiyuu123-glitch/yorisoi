// ============================================================================
// NavYorisoiFloatingSP — Ultimate Final Edition
// - アイコン完全版 / 予約ボタン強化 / 光膜統一 / GSAP負荷最小
// - iOSバウンス耐性 / 停止復帰最適化
// GUSHIKEN DESIGN × NOA
// ============================================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  const lastYRef = useRef(0);
  const rafRef = useRef(0);
  const hiddenRef = useRef(false);
  const stopTimerRef = useRef(null);
  const hasShownOnceRef = useRef(false);

  const RESTORE_DELAY = 240;

  /* ----------------------------------------------------
      初回フェード（世界観の“静けさ”1秒）
  ---------------------------------------------------- */
  useEffect(() => {
    const items = navRef.current?.querySelectorAll(".nav-sp-item");
    if (!items) return;

    gsap.killTweensOf(items);

    gsap.fromTo(
      items,
      { opacity: 0, y: 10, filter: "blur(0.12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        ease: "power3.out",
        stagger: 0.065,
        delay: 1.0,
      }
    );
  }, []);

  /* ----------------------------------------------------
      スクロール方向で出入り（完全最適化）
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const SHOW_Y = 0;
    const HIDE_Y = 70;

    const THRESHOLD = 5;
    const BOUNCE_LIMIT = 28;

    const animateTo = (hide) => {
      const el = navRef.current;
      if (!el || hiddenRef.current === hide) return;

      hiddenRef.current = hide;
      gsap.killTweensOf(el);

      gsap.to(el, {
        y: hide ? HIDE_Y : SHOW_Y,
        opacity: hide ? 0 : 1,
        duration: hide ? 0.22 : 0.32,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (hide) return;

          if (!hasShownOnceRef.current) {
            hasShownOnceRef.current = true;
            return;
          }

          gsap.fromTo(
            el,
            { y: SHOW_Y + 1 },
            {
              y: SHOW_Y,
              duration: 0.12,
              ease: "power2.out",
            }
          );
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

        if (Math.abs(diff) < THRESHOLD) return;
        if (Math.abs(diff) > BOUNCE_LIMIT) return;

        const isDown = diff > 0;
        animateTo(isDown);

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(navRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, []);

  /* ----------------------------------------------------
      現在地ハイライト
  ---------------------------------------------------- */
  useEffect(() => {
    const ids = ["#about", "#profile", "#menu", "#access", "#reserve"];

    const check = () => {
      let cur = "";
      ids.forEach((id) => {
        const el = document.querySelector(id);
        if (!el) return;

        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.33 && r.bottom > 80) cur = id;
      });
      setActive((p) => (p === cur ? p : cur));
    };

    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => window.removeEventListener("scroll", check);
  }, []);

  /* ----------------------------------------------------
      スクロール移動
  ----------------------------------------------------*/
  const scrollToTarget = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const navH = navRef.current?.getBoundingClientRect().height || 0;

    window.scrollTo({
      top:
        window.scrollY +
        el.getBoundingClientRect().top -
        Math.min(16, navH * 0.22),
      behavior: "smooth",
    });
  };

  /* ----------------------------------------------------
      Icons（完全版）
  ---------------------------------------------------- */

  const Icons = {
    about: (
      <>
        <path d="M3 9l9-6 9 6" />
        <path d="M9 21V12h6v9" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </>
    ),
    menu: (
      <>
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </>
    ),
    access: (
      <>
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2C7.5 2 4 5.6 4 10c0 6.5 8 12 8 12s8-5.5 8-12c0-4.4-3.5-8-8-8z" />
      </>
    ),
    reserve: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  };

  const list = [
    { label: "お店", key: "about", target: "#about" },
    { label: "店主", key: "profile", target: "#profile" },
    { label: "menu", key: "menu", target: "#menu" },
    { label: "地図", key: "access", target: "#access" },
    { label: "予約", key: "reserve", target: "#reserve" },
  ];

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]

        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.88) 0%,
          rgba(247,244,239,0.74) 38%,
          rgba(247,244,239,0.62) 70%,
          rgba(247,244,239,0.50) 100%
        )]

        backdrop-blur-[9px]
        border-t border-[rgba(96,78,62,0.13)]
        px-[4vw] py-[10px]
        flex justify-between
        will-change-transform
        [transform:translateZ(0)]
      "
    >
      {list.map((item) => {
        const isActive = active === item.target;
        const isReserve = item.key === "reserve";

        return (
          <button
            key={item.key}
            onClick={() => scrollToTarget(item.target)}
            className={`
              nav-sp-item relative flex flex-col items-center
              w-[17vw] text-[11.2px] tracking-[0.10em] font-medium
              select-none

              ${
                isActive
                  ? "text-[rgba(96,78,62,0.95)]"
                  : "text-[rgba(96,78,62,0.70)]"
              }

              active:opacity-[0.82]
              ${
                isReserve
                  ? "active:scale-[0.90]"
                  : "active:scale-[0.93]"
              }
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
                w-[21px] h-[21px] mb-[3px]
                transition-all
                ${
                  isReserve
                    ? "scale-[1.017] opacity-[0.97]"
                    : "scale-[1] opacity-[0.87]"
                }
              `}
            >
              {Icons[item.key]}
            </svg>

            <span>{item.label}</span>

            {/* アクティブライン */}
            {isActive && (
              <div className="
                absolute bottom-0 left-1/2 -translate-x-1/2
                w-[22px] h-[1.7px]
                bg-[rgba(96,78,62,0.36)]
                rounded-full
              " />
            )}

            {/* 予約だけ光膜 5% アップ */}
            {isReserve && (
              <div
                className="
                  absolute inset-0 -z-10 rounded-full
                  bg-[rgba(255,225,190,0.20)]
                  opacity-[0.24]
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

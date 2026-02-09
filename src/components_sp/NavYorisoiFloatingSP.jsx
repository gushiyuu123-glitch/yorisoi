// ============================================================================
// NavYorisoiFloatingSP — 最強完全版（視認性 × UX × iOS安定 × 世界観）
// GUSHIKEN DESIGN × NOA
// ============================================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NavYorisoiFloatingSP() {
  const navRef = useRef(null);
  const [active, setActive] = useState("");

  // ---- 安定化 refs ----
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const rafRef = useRef(0);

  // ---- 初回だけ「表示後の微呼吸」を入れるため ----
  const hasShownOnceRef = useRef(false);

  /* ----------------------------------------------------
        初回フェードイン（超微blur / 静けさ）
        ※ 強いblurは使わない：0.18px
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll(".nav-sp-item");
    gsap.killTweensOf(items);

    gsap.fromTo(
      items,
      { opacity: 0, y: 10, filter: "blur(0.18px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.065,
        delay: 1.15,
        overwrite: "auto",
      }
    );
  }, []);

  /* ----------------------------------------------------
        スクロールで隠れる（iOS安定版）
        - rAFで1フレーム1判定
        - THRESHOLDで微小揺れ無視
        - 表示復帰時だけ 0.8px “呼吸” を一瞬入れる
  ---------------------------------------------------- */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    lastYRef.current = window.scrollY || 0;

    const SHOW_Y = 0;
    const HIDE_Y = 72;
    const THRESHOLD = 7;

    const animateTo = (hide) => {
      const el = navRef.current;
      if (!el) return;

      if (hiddenRef.current === hide) return;
      hiddenRef.current = hide;

      gsap.killTweensOf(el);

      // hide/show の基本アニメ（今の気持ちよさは維持）
      gsap.to(el, {
        y: hide ? HIDE_Y : SHOW_Y,
        opacity: hide ? 0 : 1,
        duration: hide ? 0.24 : 0.32,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          // 表示になった瞬間だけ “0.8pxの呼吸”
          // うるさくしない：一度だけ / 120ms
          if (!hide) {
            if (!hasShownOnceRef.current) {
              hasShownOnceRef.current = true;
              return;
            }
            gsap.fromTo(
              el,
              { y: SHOW_Y + 0.8 },
              {
                y: SHOW_Y,
                duration: 0.12,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          }
        },
      });
    };

    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;

        const currentY = window.scrollY || 0;
        const diff = currentY - lastYRef.current;

        // iOSバウンス / 微小揺れ無視
        if (Math.abs(diff) < THRESHOLD) return;

        const isDown = diff > 0;
        animateTo(isDown);

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gsap.killTweensOf(navRef.current);
    };
  }, []);

  /* ----------------------------------------------------
        現在地ハイライト（安定・最適化）
        - active依存を外す（再登録ループ防止）
  ---------------------------------------------------- */
  useEffect(() => {
    const sections = ["#about", "#profile", "#menu", "#access", "#reserve"];

    const checkPosition = () => {
      let current = "";

      for (const id of sections) {
        const el = document.querySelector(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.33 && rect.bottom > 70) {
          current = id;
        }
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", checkPosition, { passive: true });
    checkPosition();

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  /* ----------------------------------------------------
        NAV LIST
        - アイコン線：1.45 → 1.32（“静けさ”）
        - menu表記：大文字にすると強いのでこのまま維持
  ---------------------------------------------------- */
  const navList = [
    {
      label: "お店",
      target: "#about",
      icon: (
        <>
          <path d="M3 9l9-7 9 7" />
          <path d="M9 22V12h6v10" />
        </>
      ),
    },
    {
      label: "店主",
      target: "#profile",
      icon: (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
        </>
      ),
    },
    {
      label: "menu",
      target: "#menu",
      icon: (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      ),
    },
    {
      label: "地図",
      target: "#access",
      icon: (
        <>
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2C7.5 2 4 5.58 4 10c0 6.25 8 12 8 12s8-5.75 8-12c0-4.42-3.5-8-8-8z" />
        </>
      ),
    },
    {
      label: "予約",
      target: "#reserve",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),
    },
  ];

  /* ----------------------------------------------------
        click: スムーススクロール（ナビ分の余白を加味）
        ※ fixed nav の高さぶんだけ少し上に余白を作る
        （scrollIntoViewはoffsetできないので window.scrollTo で）
  ---------------------------------------------------- */
  const scrollToTarget = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const nav = navRef.current;
    const navH = nav ? nav.getBoundingClientRect().height : 0;

    const top =
      window.scrollY +
      el.getBoundingClientRect().top -
      Math.min(14, navH * 0.2); // “詰まりすぎ”防止の微余白

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  return (
    <nav
      ref={navRef}
      className="
        fixed bottom-0 left-0 right-0 z-[80]

        /* ★ 背景：木の光（自然減衰カーブ） */
        bg-[linear-gradient(
          to_top,
          rgba(247,244,239,0.86) 0%,
          rgba(247,244,239,0.76) 36%,
          rgba(247,244,239,0.64) 70%,
          rgba(247,244,239,0.54) 100%
        )]

        backdrop-blur-[9px]
        border-t border-[rgba(96,78,62,0.14)]
        px-[4vw] py-[10px]
        flex justify-between

        will-change-transform
        [transform:translateZ(0)]
        [backface-visibility:hidden]
        [webkit-font-smoothing:antialiased]
      "
      role="navigation"
      aria-label="YORISOI section navigation"
    >
      {navList.map((item, i) => {
        const isActive = active === item.target;

        return (
          <button
            key={i}
            type="button"
            onClick={() => scrollToTarget(item.target)}
            aria-current={isActive ? "page" : undefined}
            className={`
              nav-sp-item
              relative
              flex flex-col items-center justify-center
              w-[17.2vw]

              text-[11.2px]
              tracking-[0.10em]
              font-medium

              ${
                isActive
                  ? "text-[rgba(96,78,62,0.94)]"
                  : "text-[rgba(96,78,62,0.68)]"
              }

              transition-[color,transform,opacity]
              duration-200
              ease-out

              /* tap の“押した感” */
              active:scale-[0.93]
              active:opacity-[0.82]
              select-none
            `}
          >
            <svg
              className={`
                w-[20px] h-[20px] mb-[3px]
                transition-[transform,opacity]
                duration-200
                ease-out
                ${isActive ? "opacity-100 scale-[1.07]" : "opacity-85 scale-[1]"}
              `}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.32"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {item.icon}
            </svg>

            <span className="leading-none">{item.label}</span>

            {/* アクティブ：控えめな木のライン（2px→1.7px） */}
            {isActive && (
              <div
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-[22px] h-[1.7px]
                  bg-[rgba(96,78,62,0.36)]
                  rounded-full
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
